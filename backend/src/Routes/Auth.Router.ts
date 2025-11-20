import { Router } from "express";

//controllers
import SignUp from '../Controllers/AuthControllers/SignUp.Controller'
import Login from '../Controllers/AuthControllers/Login.Controller'
import Logout from '../Controllers/AuthControllers/Logout.Controller'

const authRouter = Router()

authRouter.post('/signup', SignUp)
authRouter.post('/login', Login)
authRouter.post('/logout', Logout)
authRouter.get('/signup', (_, res:any) => {
    res.json({
        message : 'checking'
    })
})

export default authRouter;