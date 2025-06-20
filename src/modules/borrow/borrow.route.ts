import { Router } from "express";
import { createBorrow } from "./borrow.controller";



export const borrowRoute = Router()

borrowRoute.post("/api/borrow", createBorrow)