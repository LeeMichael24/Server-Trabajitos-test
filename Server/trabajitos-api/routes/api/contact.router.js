const express = require("express");
const router = express.Router();


const contactController = require("../../controllers/contact.controller");

const contactValidators = require("../../validators/contact.validators");
const runValidations = require("../../validators/index.middleware");


router.post("/contact",
    contactValidators.createContact,
    runValidations,
    contactController.create
);


module.exports = router;
