const Portfolio = require("../models/TPortfolio.model");
const debug = require("debug")("app:portfolio-controller");


const controller = {};

/**
 * Esta request permite al usuario poder crear un portfolio para ofrecer
 * sus servicios dentro de la app
 */
controller.create = async (req, res) => {
    try {
        const {title, description, image, category} = req.body;

        const { _id: userId } = req.user;

        const portfolio = new Portfolio({
            title: title,
            description: description,
            image: image,
            user: userId,
            category: category
        });

        const newPortfolio = await portfolio.save();

        if (!newPortfolio){
            return res.status (409).json ({error :"Ocurrio un error al tratar de crear un portfolio"});
        }
        
        return res.status(201).json(newPortfolio);
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}


/**
 * Esta request permite encontrar todos los portafolios dentro de la app
 */
controller.findAll = async (req, res) =>{
    try {
        const portfolios = 
            await Portfolio
            .find()
            .populate("user category", "name phone"); //reviews to be added to populate
  
        return res.status(200).json ({ portfolios })
        
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}


/**
 * Esta request permite encontrar todos los portafolios que pertenezcan a cierta
 * categoria
 */
controller.findPortfoliosByCategory = async (req, res) =>{
    try {
        const { category } = req.body

        const portfolios = 
            await Portfolio
            .find({category: category})
            .populate("user category", "name phone");
  
        return res.status(200).json ({ portfolios })
        
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}

//Para agregar reviews se hara una actualizacion, se pide un Portfolio que tenga como user el id de
//la persona a quien se contrato, al tener el Portfolio se accede a su atributo reviews que sera un arreglo
//de objetos donde se ingresara la review y tambien el userID de quien la deja

module.exports = controller;