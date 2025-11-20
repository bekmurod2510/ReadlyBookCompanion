import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
const prisma = new PrismaClient();

// Define the expected structure of the decoded token payload
interface CustomPayload extends JwtPayload {
    userId: number;
}

export default async function addBook(req: Request, res: Response) {
    console.log('🔹 ADD BOOK FUNCTION CALLED');
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication token missing."
        });
    }

    const SECRET_KEY = process.env.JWT_SECRET!;

    try {
        const decoded = await jwt.verify(token, SECRET_KEY) as CustomPayload;
        const {userId} = decoded;
   
        const { name, author, total_pages, current_page, status } = req.body;
        
        
        if (!name || !author || !total_pages) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, author, total_pages"
            });
        }
        
       
        if (typeof total_pages !== 'number' && isNaN(parseInt(total_pages))) {
             return res.status(400).json({
                success: false,
                message: "total_pages must be a valid number."
            });
        }

        const newBook = await prisma.book.create({
            data: {
                name: name,
                author: author,
                userId: userId, 
                total_pages: parseInt(total_pages), 
                current_page: parseInt(current_page) || 0, 
                status: status || 'UNREAD' 
            }
        });

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook
        });

    } catch (e: any) {
        console.log('DATABASE ERROR:', e);

        res.status(500).json({
            success: false,
            message: "Database error during book creation.",
            error: e.message
        });
    }
}