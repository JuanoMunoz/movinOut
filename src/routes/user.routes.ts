import { Router } from 'express'
import UserController from '../controller/userController'
import { validateToken,authorization } from '../middleware/UserMiddleware'
const userRouter: Router = Router()
userRouter.get('/', UserController.getAllUser).get('/:id', UserController.getUser)
    .post('/register', UserController.register)
    .post('/login', UserController.login)
    .delete('/:id', [validateToken, authorization], UserController.deleteUser).put('/:id', [validateToken,authorization],UserController.updateUser)

export default userRouter