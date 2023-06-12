const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

const portfolioController = require("../../controllers/portfolio.controller");
const portfolioValidator = require("../../validators/portfolio.validator");
const runValidations = require("../../validators/index.middleware");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth.middewares");

//Ruta de consulta basica, esta no va a produccion GET
router.get("/", portfolioController.findAll);
router.get("/portfolioByCategory/:identifier",
  authentication,
  portfolioController.findPortfolioByCategory
);
router.get("/myPortfolio", authentication, portfolioController.findMyPortfolio);
router.get(
  "/findPortfolioById/:identifier",
  authentication,
  portfolioController.findPortfolioById
);

//Funcionalidad usuario solicitante POST
router.post(
  "/",
  authentication,
  authorization(ROLES.USER),
  portfolioValidator.createPortfolioValidator,
  runValidations,
  portfolioController.create
);

//Funcionalidad usuario solicitante PATCH
router.patch(
  "/updateMyPortfolio/:identifier",
  authentication,
  authorization(ROLES.USER),
  portfolioController.updatePortfolio
);


router.patch("/reviews", authentication, authorization(ROLES.USER), portfolioController.createReview);
module.exports = router;
