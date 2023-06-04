const { body, param } = require("express-validator");
const validators = {};


//para poder crearlo
validators.createTrabajitoValidator = [
    body("description")
        .notEmpty()
        .withMessage("La descripción no debe ir vacia")
        .isLength({ max: 280 }).withMessage("La descripcion no debe superar los 280 carcteres"),
    body("dateInit")
        .notEmpty()
        .withMessage("La fecha de inicio no debe ir vacia"),
    body("id_hired")
        .notEmpty()
        .withMessage("El id de la persona contratada no debe ir vacio")
        .isMongoId()
        .withMessage("El id de la persona contratada debe ser un id de mongo")
];


//TODO: Agregar validacion para status


//encontrar un trabajito en especifico
validators.findByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("El id no debe ir vacio")
        .isMongoId().withMessage("El id debe ser de mongo")
]




module.exports = validators;