const Status =  require("../models/TStatus.model");
const debug =  require("debug")("app:status-controller");

const controller = {};

controller.createSatatus = async (req,res) => {
    try {
    // Paso 01: Obtener datos de Municipalidad
    const { name } = req.body;
  
    // Paso 02: Guardar municipalidad 
  
      const newStatus = new Status ({
          name: name
      })
  
      await newStatus.save();
  
      return res.status(201).json ({ message: "Status guardado con exito!"})
  
    } catch (error) {
        debug({ error });
        return res.status(500).json({ message: "Error inseperado"})
        
    }
}

module.exports = controller;