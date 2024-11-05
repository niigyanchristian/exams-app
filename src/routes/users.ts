import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/users';

const router = Router();

const registerValidator = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isString().notEmpty().withMessage('Role is required')
]

const loginValidator = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
]


router.post('/register', registerValidator, register);

router.post('/login', loginValidator, login);

export default router;
