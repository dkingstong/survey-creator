import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth';
import { SurveyVersionRepository } from '../repositories/SurveyVersionRepository';

const router = express.Router();
const surveyVersionRepository = new SurveyVersionRepository();

// Get all survey versions (protected route)
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const activeSurveys = await surveyVersionRepository.findActiveSurveys();

    return res.json({
      success: true,
      data: activeSurveys,
    });
  } catch (error) {
    console.error('Get surveys error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;
