import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import studentRoutes from './routes/students';
import examRoutes from './routes/exams';
import resultRoutes from './routes/results';
import userRoutes from './routes/users';
import { errorHandler } from './utils/errorHandler';

dotenv.config();
const app = express();
const PORT = 3000;

// Midel
app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Exam Management System' })
});

app.use('/api/auth', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/results', resultRoutes);


app.use((req: Request, res: Response) => {
    res.json({ message: 'Not Found' })
})

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
