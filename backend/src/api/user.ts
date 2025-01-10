import { UserController } from '@/controllers/userController';
import { authMiddleware, resetSession } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/resetRequest', userController.resetRequest);
userRouter.put('/resetPassword',resetSession,userController.resetPassword);
userRouter.get('/test',authMiddleware, (req,res)=>{
    res.json("hello")
})

export default userRouter;