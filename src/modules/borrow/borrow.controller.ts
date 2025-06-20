import { Request, Response } from "express";
import Borrow from "./borrow.model";



export const createBorrow = async (req:Request, res:Response)=>{
    
    const body=req.body;
    const borrow = await Borrow.create(body)

    res.send({
        success : true,
        message: "Book borrow successfully",
        data: borrow
    })
}