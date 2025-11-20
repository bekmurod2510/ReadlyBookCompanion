import {Request,Response} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

interface CustomPayload extends JwtPayload {
    userId : number
}

export default async function allBooks(req : Request, res : Response) {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication token missing."
        });
    }

    const SECRET_KEY  = process.env.JWT_SECRET!

    try {
        const decoded = await jwt.verify(token, SECRET_KEY) as CustomPayload
        const {userId} = decoded;

        const books = await prisma.book.findMany({
            where: {
                userId : userId
            }
        })

        res.status(200).json({
            success:true,
            message: "got All the Books",
            books : books
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Fetch data went wrong, check controller"
        })
    }
}