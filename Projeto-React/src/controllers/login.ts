import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";

const router = express.Router();
AppDataSource.initialize().then(()=>(
    console.log("Conexão com servidor realizada com sucesso")
)).catch((error)=>{
    console.log("Erro de conexão", error)
})

router.get("/",(req:Request, res:Response)=>{
    res.send("Bem vindo")
})

export default router