import express from "express";

const app = express();

import login from"./controllers/login"

app.use('/', login)

app.listen(process.env.PORT, () => {
console.log('Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}');
});