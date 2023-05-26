const { body } = require ("express-validator");

const validators = {};

const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/


validators.registerValidator = [
    body("name")
        .notEmpty().withMessage("El nombre no puede ir vacío"),
    body("phone")
        .notEmpty().withMessage("El nombre no puede ir vacío")
        .isMobilePhone().withMessage("Debes ingresar un numero valido"),
    body("email")
        .notEmpty().withMessage("El correo no debe ir vacío")
        .isEmail().withMessage("Debes verificar el formato del correo"),
    body("password")
        .notEmpty().withMessage("La contraseña no puede ir vacía")
        .matches(passwordRegexp).withMessage("La contraseña debe de tener entre 8 y 32 chars, y al menos 1 M, 1 m y 1 #")
]

module.exports = validators;
