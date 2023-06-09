const User =  require("../models/TUser.model");
const debug =  require("debug")("app:auth-controller");
const ROLES = require("../data/roles.constants.json")

const { createToken, verifyToken } = require("../utils/jwt.tools");

const controller = {};

controller.register = async (req,res) => {
  try {
  // Paso 01: Obtener datos del usuario
  const { name, phone, email, password, municipality} = req.body;

  // Paso 02: Verificar el username o el email esten libres

  const user = await User.findOne({email : email});
  
  if(user){
      return res.status(409).json({ error: "Este usuario ya existe"});
  }

  //debug ({ username , email, password})

  // Paso 03: Encirptar? 
  
  // Paso 04: Guardar usuario 

    const newUser = new User ({
        name: name,
        phone: phone,
        email: email,
        password: password,
        municipality: municipality,
        roles: [ROLES.USER]
    })

    await newUser.save();

    return res.status(201).json ({ message: "Usuario guardado con exito!"})

  } catch (error) {
      debug({ error });
      return res.status(500).json({ message: "Error inseperado"})
      
  }
}

controller.login = async(req,res) => {
  try {
      const {identifier, password} = req.body;
      //Paso 01: verficar si el usuario existe 
      const user = await User.findOne({email: identifier});
      
      if (!user) {
          return res.status(404).json ({error: "El usuario no existe"});
      }

  
      //Paso 02: verificar contraseñas
      if (!user.comparePassword(password)) {
          return res.status(401).json({error: "Contraseña no coincide"});
      }


      //Paso 03: exitoso o no 
      const token = createToken(user._id);


      user.token = [token, ...user.token.filter(_token => verifyToken(_token)).splice(0,4)];
      await user.save();

      //Paso 04: Registrar los token


      return res.status(200).json({token : token});

  } catch (error) {
      debug (error);
      return res.status(500).json({ message: "Error inseperado"})
  }
} ;

controller.whoami = async (req, res) => {
  try {
    const { _id, username, email, roles } = req.user;
    return res.status(200).json({ _id, username, email, roles });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }
}

controller.findAll = async (req, res) => {
  try {
    const usuarios = await User.aggregate(
      [
        {$lookup:
        {
          from: "municipalities",
          localField:"municipality",
          foreignField:"_id",
          as: "municipality"
        }}
      ]
    )
    
    return res.status(200).json({usuarios})

  } catch (error) {
    debug({error})
    return res.status(500).json({error: "Error interno de servidor"})
  }
};


controller.findAll2 = async (req, res) => {
  try {
    const usuarios = await User
      .find()
      .populate("municipality")
    
    return res.status(200).json({usuarios})

  } catch (error) {
    debug({error})
    return res.status(500).json({error: "Error interno de servidor"})
  }
};


module.exports = controller;