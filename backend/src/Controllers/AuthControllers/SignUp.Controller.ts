import setCookie from './utils/setCookie';
import generateToken from './utils/generateToken'
import bcrypt from "bcrypt";
import {Request,Response} from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function SignUp(req: Request, res: Response){
  const { name, email, password } = req.body;
  const saltRounds = 10; 

  try {
    const existingUser = await prisma.user.findFirst({
        where: { email: email }
    });

    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'User already exists with this email'
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds); 

    // 3. Await the database creation
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword, // Use the result of the await
      }
    });

    // 4. Generate Token, Set Cookie, and Send Success Response
    const token = generateToken(user.id);
   
    setCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.code === 'P2002') { 
        return res.status(409).json({ 
            success: false,
            message: "A user with this email address already exists."
        });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

export default SignUp;