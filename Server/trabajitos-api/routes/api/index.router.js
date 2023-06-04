const express = require('express');
const router = express.Router();


//importar los enrutadores

 const postRouter = require("./post.router");
 const authRouter = require ("./auth.router");
 const trabajitoRouter = require("./trabajitos.router");
 const pruebasRouter = require("./pruebas.router");
 const statusRouter = require("./status.router");
 const categoryRouter = require ("./category.router")


// const contactRouter = require ("./contact.router");


//definir las rutas
router.use("/auth", authRouter);
router.use("/trabajito", trabajitoRouter);
router.use("/pruebas", pruebasRouter);
router.use("/post", postRouter);
router.use("/status", statusRouter);
router.use("/category", categoryRouter);



module.exports = router;