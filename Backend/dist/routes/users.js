"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const UserRepository_1 = require("../repositories/UserRepository");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const userRepository = new UserRepository_1.UserRepository();
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const users = await userRepository.findAll();
        return res.json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        console.error('Get users error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userRepository.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.json({
            success: true,
            data: user.toJSON(),
        });
    }
    catch (error) {
        console.error('Get user error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
router.put('/:id', [
    auth_1.authenticateToken,
    (0, express_validator_1.body)('name').optional().trim().isLength({ min: 2 }),
    (0, express_validator_1.body)('email').optional().isEmail().normalizeEmail(),
], async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        const existingUser = await userRepository.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        if (email && email !== existingUser.email) {
            const emailExists = await userRepository.emailExists(email, id);
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already taken',
                });
            }
        }
        const updateData = {};
        if (firstName)
            updateData.firstName = firstName;
        if (lastName)
            updateData.lastName = lastName;
        if (email)
            updateData.email = email;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update',
            });
        }
        const updatedUser = await userRepository.update(id, updateData);
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser.toJSON(),
        });
    }
    catch (error) {
        console.error('Update user error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await userRepository.delete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.json({
            success: true,
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        console.error('Delete user error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map