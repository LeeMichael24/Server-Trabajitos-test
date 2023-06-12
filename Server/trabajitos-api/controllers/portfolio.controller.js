const Portfolio = require("../models/TPortfolio.model");
const debug = require("debug")("app:portfolio-controller");

const controller = {};

/**
 * Esta request permite al usuario poder crear un portfolio para ofrecer
 * sus servicios dentro de la app
 */
controller.create = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;

    const { _id: userId } = req.user;

    const portfolio = new Portfolio({
      title: title,
      description: description,
      image: image,
      user: userId,
      category: category,
    });

    const newPortfolio = await portfolio.save();

    if (!newPortfolio) {
      return res
        .status(409)
        .json({ error: "Ocurrio un error al tratar de crear un portfolio" });
    }

    return res.status(201).json(newPortfolio);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
};

//request para mostrar mi portfolio de usuario
controller.findMyPortfolio = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const portfolio = await Portfolio.findOne({ user: userId }).populate(
      "user",
      "name email phone municipality -_id"
    );

    if (!portfolio) {
      return res.status(404).json({ error: "No se encontro el portafolio" });
    }
    return res.status(200).json(portfolio);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
};

//request para encontrar mi portafolio por id// done!
// - es para no mostrar el id del usuario
controller.findPortfolioById = async (req, res) => {
  try {
    const { identifier } = req.params;
    const portfolio = await Portfolio.findOne({ _id: identifier }).populate(
      "user",
      "name email phone municipality -_id"
    );

    if (!portfolio) {
      return res.status(404).json({ error: "No se encontro el portafolio" });
    }
    return res.status(200).json(portfolio);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
};

//update info user
controller.updatePortfolio = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;
    const { identifier } = req.params;

    const updatedFields = {};

    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (image) updatedFields.image = image;
    if (category) updatedFields.category = category;

    const newUpdatePortfolio = await Portfolio.findByIdAndUpdate(
      identifier,
      updatedFields,
      {
        new: true,
      }
    );

    debug(newUpdatePortfolio);

    if (!newUpdatePortfolio) {
      return res
        .status(409)
        .json({ error: "No se pudo actualizar el portfolio" });
    }
    return res.status(200).json(newUpdatePortfolio);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
};

//request para encontrar portafolio de otros usuarios por categoria y tener en cuenta que no sea el mio
controller.findPortfolioByCategory = async (req, res) => {
  try {
    const { identifier } = req.params;
    const { _id } = req.user;
    const portfolio = await Portfolio.find({
      category: identifier,
      user: { $ne: _id },
    });

    if (!portfolio) {
      return res.status(404).json({ error: "No se encontro el portafolio" });
    }
    return res.status(200).json(portfolio);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
};

/**
 * Esta request permite encontrar todos los portafolios dentro de la app
 */
controller.findAll = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate(
      "user category",
      "name phone"
    ); //reviews to be added to populate

    return res.status(200).json({ portfolios });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
};

//Para agregar reviews se hara una actualizacion, se pide un Portfolio que tenga como user el id de
//la persona a quien se contrato, al tener el Portfolio se accede a su atributo reviews que sera un arreglo
//de objetos donde se ingresara la review y tambien el userID de quien la deja

/* Segmento de REVIEWS */

//request para crear una review metodo PATCH
controller.createReview = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { review, portfolioId, qualification } = req.body;

    const portfolio = await Portfolio.findOne({ _id: portfolioId });

    if (!portfolio) {
      return res.status(404).json({ error: "No se encontro el portafolio" });
    }

    const newReview = {
      id_user: userId,
      description: review,
      qualification: qualification,
    };

    portfolio.otherReviews.reviews.push(newReview);

    const newPortfolio = await portfolio.save();

    if (!newPortfolio) {
      return res
        .status(409)
        .json({ error: "Ocurrio un error al tratar de crear una review" });
    }

    return res.status(201).json(newPortfolio);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
};

module.exports = controller;
