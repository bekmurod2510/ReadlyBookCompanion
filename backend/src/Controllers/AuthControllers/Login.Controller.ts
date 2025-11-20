import { Prisma } from '@prisma/client';
import bycrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';
import setCookie from './utils/setCookie';
import generateToken from './utils/generateToken';
import { error } from 'console';
const prisma = new PrismaClient()

const Login = async (req :any, res:any ) =>{
    try{
    const {email, password} = req.body;

    const alreadyExists = await prisma.user.findFirst({
        where : {
            email : email
        }
    })

    if(!alreadyExists){
        res.status(400).json({
            message: "User does not exists with this email. Please register!"
        })
    }

    const validPassword = await bycrypt.compare(password, alreadyExists!.password)

    if(!validPassword){
        res.status(401).json({
            message: "Email or password incorrect."
        })
    }

    const token = generateToken(alreadyExists!.id)

    setCookie(res,token);

    res.status(200).json({
        success: true,
        message: "Logged in successfully!",
        user:{
            id : alreadyExists!.id,
            name: alreadyExists!.name,
            email: alreadyExists!.email
        }
    })
}catch(error){
    console.log(error),
    res.status(400).json({
        message:"LogIn error!"
    })
}
    
}

export default Login