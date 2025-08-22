"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SurveyVersionQuestionRepository_1 = require("../repositories/SurveyVersionQuestionRepository");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const surveyVersionQuestionRepository = new SurveyVersionQuestionRepository_1.SurveyVersionQuestionRepository();
router.get('/surveyVersion/:surveyVersionId', auth_1.authenticateToken, async (req, res) => {
    try {
        const activeSurveyVersionQuestions = await surveyVersionQuestionRepository.findBySurveyVersionId(req.params.surveyVersionId);
        return res.json({
            success: true,
            data: activeSurveyVersionQuestions,
        });
    }
    catch (error) {
        console.error('Get question versions error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.default = router;
//# sourceMappingURL=surveyVersionquestion.js.map