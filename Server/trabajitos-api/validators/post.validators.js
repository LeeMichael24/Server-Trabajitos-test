const { body, param } = require("express-validator");
const validators = {};

validators.createPostValidator = [
    body("name")
        .notEmpty()
        .withMessage("El nombre no debe ser vacio"),
    body("lastName")
        .notEmpty()
        .withMessage("El nombre no debe ser vacio"),
    body("description")
        .notEmpty().withMessage("La descripcion no debe ser vacia")
        .isLength({ max: 280 }).withMessage("La descripcion no debe superar los 240 carcteres"),
    body("image")
        .optional()
        .notEmpty().withMessage("Debes de colocar una imagen")
        .isURL().withMessage("La imagen debe ser una URL"),
    body("email")
        .notEmpty()
        .withMessage("Debe escribir su correo"),
    body("number")
        .notEmpty()
        .withMessage("El nombre no debe ser vacio"),
    body("location")
        .notEmpty()
        .withMessage("Debe escribir su direccion"),
    body("imageProfile")
        .optional()
        .notEmpty().withMessage("Debes de colocar una imagen")
        .isURL().withMessage("La imagen debe ser una URL"),
    body("category")
        .optional()
        .notEmpty().withMessage("Debes de colocar una categoria")

];


validators.findByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("El id no debe ir vacio")
        .isMongoId().withMessage("El id debe ser de mongo")
]

module.exports = validators;