import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/students';

const router = Router();

const validator = [
    body('first_name').isString().withMessage('First name must be a string'),
    body('last_name').isString().withMessage('Last name must be a string'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('date_of_birth').isISO8601().withMessage('Date must be in ISO 8601 format'),
]

router.route('/').
    get(authenticateToken, getStudents).
    post(authenticateToken, authorizeRole('admin'), validator, createStudent);

router.route('/:id').
    get(authenticateToken, getStudentById).
    put(authenticateToken, authorizeRole('admin'), validator, updateStudent).
    delete(authenticateToken, authorizeRole('admin'), deleteStudent);

export default router;
