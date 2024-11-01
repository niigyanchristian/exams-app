import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import { createResult, getResults, getResultById, updateResult, deleteResult } from '../controllers/results';

const router = Router();

const validator = [
    body('student_id').isInt({ min: 1 }).withMessage('Student ID must be a positive integer'),
    body('exam_id').isInt({ min: 1 }).withMessage('Exam ID must be a positive integer'),
    body('marks_obtained').isInt({ min: 0 }).withMessage('Marks obtained must be a non-negative integer'),
]

router.route('/').
    get(authenticateToken, getResults).
    post(authenticateToken, authorizeRole('admin'), validator, createResult);

router.route('/:id').
    get(authenticateToken, getResultById).
    put(authenticateToken, authorizeRole('admin'), validator, updateResult).
    delete(authenticateToken, authorizeRole('admin'), deleteResult);


export default router;
