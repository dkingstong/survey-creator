import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { ResponseRepository } from '../repositories/ResponseRepository';
import { authenticateToken } from '../middleware/auth';
import { SurveySessionRepository } from '../repositories/SurveySessionRepository';
import { QuestionVersionRepository } from '../repositories/QuestionVersionRepository';
import { AppDataSource } from '../config/database';
import { Response as ResponseEntity } from '../entities/Response';
import { SurveySession, SurveyStatus } from '../entities/SurveySession';

const router = express.Router();
const responseRepository = new ResponseRepository();
const surveySessionRepository = new SurveySessionRepository();
const questionVersionRepository = new QuestionVersionRepository();

// Get all responses for a survey session (protected route)
router.get('/surveySession/:surveySessionId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const responses = await responseRepository.findBySurveySessionId(req.params.surveySessionId);
    
    return res.json({
      success: true,
      data: responses,
    });
  } catch (error) {
    console.error('Get responses error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

router.post('/', [
  body('surveySessionId').exists().withMessage('Survey session ID is required'), 
  body('questionVersionId').exists().withMessage('Question version ID is required'), 
  body('value').exists().withMessage('Value is required')],
  authenticateToken, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { surveySessionId, questionVersionId, value, is_last_question } = req.body;
    const [surveySession, questionVersion] = await Promise.all([
      surveySessionRepository.findById(surveySessionId),
      questionVersionRepository.findById(questionVersionId)
    ]);
    if (!surveySession || !questionVersion) {
      return res.status(404).json({
        success: false,
        message: 'Survey session or question version not found',
      });
    }
    // creating a response should be in a transaction
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let response;
    try {
      // Use the query runner for all database operations
      const responseRepository = queryRunner.manager.getRepository(ResponseEntity);
      const surveySessionRepository = queryRunner.manager.getRepository(SurveySession);
      
      // Create the response
      const newResponse = responseRepository.create({ surveySession, questionVersion, value });
      response = await responseRepository.save(newResponse);
      
      // Update the survey session
      await surveySessionRepository.update(surveySessionId, { question_number: surveySession.question_number + 1, status: is_last_question ? SurveyStatus.completed : SurveyStatus.in_progress });
      
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    
    return res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Create response error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;
