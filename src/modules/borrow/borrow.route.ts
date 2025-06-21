import { Router } from "express";
import {  createBorrow, getBorrow } from "./borrow.controller";



export const borrowRouter = Router()

borrowRouter.post("/api/borrow", createBorrow)
borrowRouter.get("/api/borrow", getBorrow)