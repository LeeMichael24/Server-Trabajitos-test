const express = require('express');
const router = express.Router();


//importar los enrutadores

 const postRouter = require("./post.router");
 const authRouter = require ("./auth.router");


// const contactRouter = require ("./contact.router");


//definir las rutas
router.use("/auth", authRouter);
router.use("/post", postRouter);

//router.use("/contact", contactRouter); 



module.exports = router;