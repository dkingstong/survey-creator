import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth';
import { SurveySessionRepository } from '../repositories/SurveySessionRepository';
import { SurveyVersionRepository } from '../repositories/SurveyVersionRepository';
import { User } from '../entities/User';
import { SurveyVersion } from '../entities/SurveyVersion';
import { UserRepository } from '../repositories/UserRepository';

const router = express.Router();
const surveySessionRepository = new SurveySessionRepository();
const surveyVersionRepository = new SurveyVersionRepository();
const userRepository = new UserRepository();
// Get survey sessions by userId (protected route)
router.get('/user/:userId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const activeSurveySessions = await surveySessionRepository.findByUserId(req.params.userId);

    return res.json({
      success: true,
      data: activeSurveySessions,
    });
  } catch (error) {
    console.error('Get survey sessions error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Create a new survey session (protected route)
router.post('/', [body('surveyVersionId').exists().withMessage('Survey version ID is required')], authenticateToken, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const surveyVersion = await surveyVersionRepository.findById(req.body.surveyVersionId);
    const user = await userRepository.findById(req.user?.userId as string);
    const surveySession = await surveySessionRepository.create({
      user: user as User,
      status: 'in_progress',
      question_number: 0,
      surveyVersion: surveyVersion as SurveyVersion,
      name: surveyVersion?.name,
    });

    return res.json({
      success: true,
      data: surveySession,
    });
  } catch (error) {
    console.error('Create survey session error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;
