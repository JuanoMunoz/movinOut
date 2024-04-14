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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
  next();
});
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