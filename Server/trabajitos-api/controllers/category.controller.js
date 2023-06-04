const Category =  require("../models/TCategory.model");
const debug =  require("debug")("app:category-controller");

const controller = {};

controller.createCategory = async (req,res) => {
    try {
    // Paso 01: Obtener datos de Municipalidad
    const { name, image} = req.body;
  
    // Paso 02: Guardar municipalidad 
        debug({ name, image});
      const newCategory = new Category ({
          name: name,
          image: image
      })
  
      await newCategory.save();
  
      return res.status(201).json ({ message: "Categoria guardado con exito!"})
  
    } catch (error) {
        debug({ error });
        return res.status(500).json({ message: "Error inseperado"})
        
    }
}

module.exports = controller;