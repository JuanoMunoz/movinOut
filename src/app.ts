import express, { Express } from 'express';
import userRouter from './routes/user.routes';
import todoRouter from './routes/todo.routes';
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'
import './database'
const app: Express = express()
const PORT: number = 3000;
app.use(cors({
    origin : ['http:localhost:5173','https://movin-out.vercel.app']
}))
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/todos', todoRouter)
app.get('/', (req, res) => {
    res.redirect('/api/v1/')
})
app.listen(PORT, () => {
    console.log('Listening on port 3000');
})