import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { OptionRepository } from '../repositories/OptionRepository';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const optionRepository = new OptionRepository();

// Get all options for a question version (protected route)
router.get('/questionVersion/:questionVersionId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const activeOptions = await optionRepository.findByQuestionVersionId(req.params.questionVersionId);
    
    return res.json({
      success: true,
      data: activeOptions,
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
