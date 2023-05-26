const { body, param } = require("express-validator");
const validators = {};

validators.createPostValidator = [
    body("description")
        .notEmpty()
        .withMessage("La descripción no debe ser vacio")
        .isLength({ max: 280 }).withMessage("La descripcion no debe superar los 240 carcteres"),
    body("dateInit")
        .notEmpty()
        .withMessage("La fecha de inicio no debe estar vacia"),
    body("email")
        .notEmpty()
        .withMessage("Debe escribir su correo"),
    body("id_solicitor")
        .notEmpty()
        .withMessage("El campo de usuario no debe estar vacio"),
    body("state")
        .notEmpty()
        .withMessage("El estado no debe estar vacio"),

];


validators.findByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("El id no debe ir vacio")
        .isMongoId().withMessage("El id debe ser de mongo")
]

module.exports = validators;