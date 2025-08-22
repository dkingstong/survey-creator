import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { SurveyVersionQuestionRepository } from '../repositories/SurveyVersionQuestionRepository';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const surveyVersionQuestionRepository = new SurveyVersionQuestionRepository();

// Get all questions for a survey version (protected route)
router.get('/surveyVersion/:surveyVersionId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const activeSurveyVersionQuestions = await surveyVersionQuestionRepository.findBySurveyVersionId(req.params.surveyVersionId);

    return res.json({
      success: true,
      data: activeSurveyVersionQuestions,
    });
  } catch (error) {
    console.error('Get question versions error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;
