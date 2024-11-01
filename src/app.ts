import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import studentRoutes from './routes/students';
import examRoutes from './routes/exams';
import resultRoutes from './routes/results';
import userRoutes from './routes/users';

dotenv.config();
const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
