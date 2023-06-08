const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

const trabajitoController = require("../../controllers/trabajitos.controller");
const trabajitoValidator = require("../../validators/trabajito.validators");
const runValidations = require("../../validators/index.middleware");

const {authentication, authorization} = require("../../middlewares/auth.middewares");

//Ruta de consulta basica, esta no va a produccion
router.get("/", trabajitoController.findAll);
router.get("/requests",
    authentication,
    authorization(ROLES.USER),
    trabajitoController.findMyRequests    
)

router.get("/jobs",
    authentication,
    authorization(ROLES.USER),
    trabajitoController.findMyJobs  
)

//Funcionalidad usuario solicitante
router.post("/",
    authentication,
    authorization(ROLES.USER),
    trabajitoValidator.createTrabajitoValidator,
    runValidations,
    trabajitoController.create
);

router.patch("/deletion/:identifier",
    authentication,
    authorization(ROLES.USER),
    trabajitoValidator.findByIdValidator,
    runValidations,
    trabajitoController.trabajitoDeletion
);

module.exports = router;
