"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const SurveyVersionRepository_1 = require("../repositories/SurveyVersionRepository");
const router = express_1.default.Router();
const surveyVersionRepository = new SurveyVersionRepository_1.SurveyVersionRepository();
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const activeSurveys = await surveyVersionRepository.findActiveSurveys();
        return res.json({
            success: true,
            data: activeSurveys,
        });
    }
    catch (error) {
        console.error('Get surveys error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.default = router;
//# sourceMappingURL=surveyVersion.js.map