const express = require("express");
const router = express.Router();

const pruebasController = require("../../controllers/pruebas.controller");



//Ruta de creacion municipalidad
router.post("/", pruebasController.createMunicipality);


module.exports = router;