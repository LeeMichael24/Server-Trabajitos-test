const { verifyToken } = require ("../utils/jwt.tools");
const debug = require("debug")("app:auth-middleware");
const User = require("../models/TUser.model");

const ROLES = require("./../data/roles.constants.json");

const middlewares = {};

const tokenPrefix = "Bearer"

middlewares.authentication = async (req, res , next) => {
    try {  
        //Paso 01: Verificar que authorization exista
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({error: "No autorizado"});   
        }


        //Paso 02: Verificar token valido 
        const [prefix, token] = authorization.split(" ");

        if (prefix !== tokenPrefix) {
            return res.status(401).json({error: "No autorizado00"});   
        }

        if(!token){
            return res.status(401).json({error: "No autorizado"});   
        }

        const tokenObject = verifyToken(token);

        if (!tokenObject) {
            return res.status(401).json({error: "No autorizado"});   
        }

        const { userId } = tokenObject;
        debug (userId);  

        //Paso 03: Obtener al usuario
        const user = await User.findById(userId); 

        if (!user){
            return res.status(401).json({error: "No autorizado"});   
        }

        //Paso 04: Token registrado 
        const isTokenValid = user.tokens.includes(token);
        if(!isTokenValid){
            return res.status(401).json({error: "No autorizado"});   
        }


        //Paso 05: Modifiacr la req para obtener la info del usuario
        req.user = user;
        req.token = token;

        //Paso 06: Paso al siguiente middleware
        next();
    } catch (error) {
        debug ({error})
        return res.status(500).json({error: "Error insesperado de servidor"})
    }
}


middlewares.authorization = (roleRequired = ROLES.SYSADMIN) => {
    return (req, res, next ) => {
        try {
            //Paso 0: Asumir que se ejecuta despues del proceso de auntenticacion
        const { roles=[] } = req.user;

        //Paso 1: Verificar si el rol existe
        const roleIndex = 
            roles.findIndex(role => (role == roleRequired || role == ROLES.SYSADMIN ));

        //Paso 2: Realizar el filtro de rol
        if(roleIndex < 0){
            return res.status(403).json({error: "No tienes permiso"})
        }
        //Paso 03: Pasar al siguiente middleware
        next();
        } catch (error) {
            debug ({error});
            return res.status(500).json({error: "Error insesperado de servidor"});
        }
    } 
} 



module.exports = middlewares; 