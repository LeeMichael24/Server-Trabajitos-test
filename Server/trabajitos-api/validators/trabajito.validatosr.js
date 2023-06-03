const { body, param } = require("express-validator");
const validators = {};

validators.createTrabajitoValidator = [
    body("description")
        .notEmpty()
        .withMessage("La descripción no debe ir vacia")
        .isLength({ max: 280 }).withMessage("La descripcion no debe superar los 280 carcteres"),
    body("dateInit")
        .notEmpty()
        .withMessage("La fecha de inicio no debe ir vacia")
];


validators.findByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("El id no debe ir vacio")
        .isMongoId().withMessage("El id debe ser de mongo")
]

module.exports = validators;