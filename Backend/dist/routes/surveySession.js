"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const SurveySessionRepository_1 = require("../repositories/SurveySessionRepository");
const SurveyVersionRepository_1 = require("../repositories/SurveyVersionRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const router = express_1.default.Router();
const surveySessionRepository = new SurveySessionRepository_1.SurveySessionRepository();
const surveyVersionRepository = new SurveyVersionRepository_1.SurveyVersionRepository();
const userRepository = new UserRepository_1.UserRepository();
router.get('/user/:userId', auth_1.authenticateToken, async (req, res) => {
    try {
        const activeSurveySessions = await surveySessionRepository.findByUserId(req.params.userId);
        return res.json({
            success: true,
            data: activeSurveySessions,
        });
    }
    catch (error) {
        console.error('Get survey sessions error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
router.post('/', [(0, express_validator_1.body)('surveyVersionId').exists().withMessage('Survey version ID is required')], auth_1.authenticateToken, async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const surveyVersion = await surveyVersionRepository.findById(req.body.surveyVersionId);
        const user = await userRepository.findById(req.user?.userId);
        const surveySession = await surveySessionRepository.create({
            user: user,
            status: 'active',
            question_number: 0,
            surveyVersion: surveyVersion,
            name: surveyVersion?.name,
        });
        return res.json({
            success: true,
            data: surveySession,
        });
    }
    catch (error) {
        console.error('Create survey session error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.default = router;
//# sourceMappingURL=surveySession.js.map