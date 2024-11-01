import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import { createExam, getExams, getExamById, updateExam, deleteExam } from '../controllers/exams';

const router = Router();

const validator = [
    body('subject').isString().withMessage('Subject must be a string'),
    body('date').isISO8601().withMessage('Date must be in ISO 8601 format'),
    body('total_marks').isInt({ min: 1 }).withMessage('Total marks must be a positive integer'),
]

router.route('/').
    get(authenticateToken, getExams).
    post(authenticateToken, authorizeRole('admin'), validator, createExam)

router.route('/:id').
    get(authenticateToken, getExamById).
    put(authenticateToken, authorizeRole('admin'), validator, updateExam).
    delete(authenticateToken, authorizeRole('admin'), deleteExam);

export default router;
