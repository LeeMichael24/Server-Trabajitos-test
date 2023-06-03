const Municipality =  require("../models/TMunicipality.model");
const debug =  require("debug")("app:auth-controller");

const controller = {};

controller.createMunicipality = async (req,res) => {
    try {
    // Paso 01: Obtener datos de Municipalidad
    const { name } = req.body;
  
    // Paso 02: Guardar municipalidad 
  
      const newMunicipality = new Municipality ({
          name: name
      })
  
      await newMunicipality.save();
  
      return res.status(201).json ({ message: "Municipalidad guardado con exito!"})
  
    } catch (error) {
        debug({ error });
        return res.status(500).json({ message: "Error inseperado"})
        
    }
}

module.exports = controller;