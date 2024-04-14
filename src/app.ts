import express, { Express } from 'express';
import userRouter from './routes/user.routes';
import todoRouter from './routes/todo.routes';
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'
import './database'
const app: Express = express()
const PORT: number = 3000;
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/todos', todoRouter)
app.get('/', (req, res) => {
    res.status(200).json({
        links: {
            users: 'https://movin-out-api.vercel.app/api/v1/users/',
            todos: 'https://movin-out-api.vercel.app/api/v1/todos/'
        }
    })
})
app.listen(PORT, () => {
    console.log('Listening on port 3000');
})
export default app