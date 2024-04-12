import express, { Express } from 'express';
import userRouter from './routes/user.routes';
import morgan from 'morgan'
import cors from 'cors'
import './database'
const app: Express = express()
const PORT: number = 3000;
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/v1/users', userRouter)
app.get('/', (req, res) => {
    res.redirect('/api/v1/')
})
app.use(cors())
app.listen(PORT, () => {
    console.log('Listening on port 3000');
})