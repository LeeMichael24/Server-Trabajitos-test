const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

const trabajitoController = require("../../controllers/trabajitos.controller");
const trabajitoValidator = require("../../validators/trabajito.validators");
const runValidations = require("../../validators/index.middleware");

const {authentication, authorization} = require("../../middlewares/auth.middewares");

//Ruta de consulta basica, esta no va a produccion
router.get("/", trabajitoController.findAll);

//Ruta de solicitudes de trabajitos
router.get("/requests",
    authentication,
    trabajitoController.findMyRequests    
)
//Ruta de solicitud de trabajito especifico
router.get("/requests/:identifier",
    authentication,
    trabajitoValidator.findByIdValidator,
    runValidations,
    trabajitoController.findRequestById    
)

router.get("/jobs",
    authentication,
    trabajitoController.findMyJobs  
)

router.get("/job/:identifier",
    authentication,
    trabajitoValidator.findByIdValidator,
    runValidations,
    trabajitoController.findJobById    
)

//Funcionalidad usuario solicitante
router.post("/",
    authentication,
    authorization(ROLES.USER),
    trabajitoValidator.createTrabajitoValidator,
    runValidations,
    trabajitoController.create
);


router.patch("/start",
    authentication,
    authorization(ROLES.USER),
    trabajitoController.startTrabajito
);

router.patch("/finish",
    authentication,
    authorization(ROLES.USER),
    trabajitoController.endTrabajito
);

router.patch("/finalization",
    authentication,
    authorization(ROLES.USER),
    trabajitoController.endConfirmationTrabajito
);

router.patch("/deletion/:identifier",
    authentication,
    authorization(ROLES.USER),
    trabajitoValidator.findByIdValidator,
    runValidations,
    trabajitoController.trabajitoDeletion
);

module.exports = router;
