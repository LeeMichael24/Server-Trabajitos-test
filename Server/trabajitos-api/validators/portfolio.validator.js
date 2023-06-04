const { body, param } = require("express-validator");
const validators = {};


//para poder crearlo
validators.createPortfolioValidator = [
    body("description")
        .notEmpty()
        .withMessage("La descripción no debe ir vacia")
        .isLength({ max: 280 }).withMessage("La descripcion no debe superar los 280 carcteres"),
    body("title")
        .notEmpty()
        .withMessage("El titulo no debe ir vacio"),
    body("category")
        .notEmpty()
        .withMessage("El id de la categoria no debe estar vacio")
        .isMongoId()
        .withMessage("El id de la categoria ddebe ser un id de mongo"),
];


//TODO: Agregar validacion para status


//encontrar un trabajito en especifico
validators.findByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("El id no debe ir vacio")
        .isMongoId().withMessage("El id debe ser de mongo")
]




module.exports = validators;