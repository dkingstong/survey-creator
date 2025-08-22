"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const ResponseRepository_1 = require("../repositories/ResponseRepository");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const responseRepository = new ResponseRepository_1.ResponseRepository();
router.get('/surveySession/:surveySessionId', auth_1.authenticateToken, async (req, res) => {
    try {
        const responses = await responseRepository.findBySurveySessionId(req.params.surveySessionId);
        return res.json({
            success: true,
            data: responses,
        });
    }
    catch (error) {
        console.error('Get responses error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
router.post('/', [
    (0, express_validator_1.body)('surveySessionId').exists().withMessage('Survey session ID is required'),
    (0, express_validator_1.body)('questionVersionId').exists().withMessage('Question version ID is required'),
    (0, express_validator_1.body)('value').exists().withMessage('Value is required')
], auth_1.authenticateToken, async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const response = await responseRepository.create(req.body);
        return res.json({
            success: true,
            data: response,
        });
    }
    catch (error) {
        console.error('Create response error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.default = router;
//# sourceMappingURL=response.js.map