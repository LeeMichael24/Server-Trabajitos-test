const Category = require("../models/TCategory.model");
const debug = require("debug")("app:category-controller");

const controller = {};

controller.createCategory = async (req, res) => {
  try {
    // Paso 01: Obtener datos de Municipalidad
    const { name, image } = req.body;

    // Paso 02: Guardar municipalidad
    debug({ name, image });
    const newCategory = new Category({
      name: name,
      image: image,
    });

    await newCategory.save();

    return res.status(201).json({ message: "Categoria guardado con exito!" });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ message: "Error inseperado" });
  }
};

controller.findAll = async (req, res) => {
  try {
    const category = await Category.find();
    if (!category)
      return res.status(404).json({ message: "No se encontraron datos" });
    return res.status(200).json({ category });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
};

module.exports = controller;
