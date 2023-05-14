const { body } = require("express-validator");
const validators = {};

validators.createContact = [

    body("email")
        .notEmpty().withMessage("El correo no debe ir vacío")
        .isEmail().withMessage("Debes verificar el formato del correo"),
    body("email")
        .notEmpty()
        .withMessage("Debe escribir su correo")
        .isLength({ max: 280 }).withMessage("La descripcion no debe superar los 240 carcteres")


];

module.exports = validators;
