const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

const portfolioController = require("../../controllers/portfolio.controller");
const portfolioValidator = require("../../validators/portfolio.validator")
const runValidations = require("../../validators/index.middleware");

const {authentication, authorization} = require("../../middlewares/auth.middewares");

//Ruta de consulta basica, esta no va a produccion
router.get("/", portfolioController.findAll);

//Funcionalidad usuario solicitante
router.post("/",
    authentication,
    authorization(ROLES.USER),
    portfolioValidator.createPortfolioValidator,
    runValidations,
    portfolioController.create
);

module.exports = router;
