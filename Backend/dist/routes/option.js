"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OptionRepository_1 = require("../repositories/OptionRepository");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const optionRepository = new OptionRepository_1.OptionRepository();
router.get('/questionVersion/:questionVersionId', auth_1.authenticateToken, async (req, res) => {
    try {
        const activeOptions = await optionRepository.findByQuestionVersionId(req.params.questionVersionId);
        return res.json({
            success: true,
            data: activeOptions,
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
//# sourceMappingURL=option.js.map