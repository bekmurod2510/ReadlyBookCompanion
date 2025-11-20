import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface CustomPayload extends JwtPayload {
  userId: number; 
}

export default async function getDataController(req:any, res:any) {
    const token = req.cookies.auth_token

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication token missing."
        });
    }

    console.log(token);
    const SECRET_KEY  = process.env.JWT_SECRET!
    try {
        const decoded = await jwt.verify(token, SECRET_KEY) as CustomPayload
        const {userId} = decoded;
        const data = await prisma.user.findUnique({
            where: {
                id : userId
            },
            include :{
                books : true
            }
        })

        res.status(200).json({
            success:true,
            message: "Got data successfully!",
            userData : data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Fetch data went wrong, check controller"
        })
    }
    
}