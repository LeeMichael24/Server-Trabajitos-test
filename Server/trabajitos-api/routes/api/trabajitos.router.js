const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

const trabajitoController = require("../../controllers/trabajitos.controller");
const trabajitoValidator = require("../../validators/trabajito.validatosr");
const runValidations = require("../../validators/index.middleware");

const {authentication, authorization} = require("../../middlewares/auth.middewares");

//Ruta de consulta basica, esta no va a produccion
router.get("/", trabajitoController.findAll);

//Funcionalidad usuario solicitante
router.post("/",
    authentication,
    authorization(ROLES.USER),
    trabajitoValidator.createTrabajitoValidator,
    runValidations,
    trabajitoController.create
);

module.exports = router;
