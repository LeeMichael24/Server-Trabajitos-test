const express = require("express");
const router = express.Router();

const statusController = require("../../controllers/status.controller");



//Ruta de creacion municipalidad
router.post("/", statusController.createSatatus);


module.exports = router;