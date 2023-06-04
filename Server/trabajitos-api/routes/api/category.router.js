const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/category.controller");



//Ruta de creacion municipalidad
router.post("/", categoryController.createCategory);
router.get("/", categoryController.findAll);


module.exports = router;