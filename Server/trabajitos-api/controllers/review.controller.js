const Review = require("../models/TReview.model");
const debug = require("debug")("app:review-controller");

const controller = {};

/**
 * Esta request permite crear una review luego de finalizar un trabajito, requiere descripcion, calificacion,
 * id del solicitante y id del portafolio
 */
controller.create = async (req, res) => {
    try {
        const {description, qualification, portfolio} = req.body;

        const { _id: userId } = req.user;

        const review = new Review({
            description: description,
            qualification: qualification,
            id_user: userId,
            id_portfolio: portfolio
        });

        const newReview = await review.save();

        if (!newReview){
            return res.status (409).json ({error :"Ocurrio un error al tratar de crear una review"});
        }

        return res.status(201).json(newReview);
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}

/**
 * Esta request permite encontrar las reviews con informacion de un usuario que ha
 * pedido que se realice un trabajito (adjunto a Portfolio)
 */
controller.findReviewsOfPortfolio = async (req, res) =>{
    try {
        const { portfolio } = req.body;

        const reviews = 
            await Review
            .find({ id_portfolio: portfolio })
            .populate("id_user", "name phone email");
  
        return res.status(200).json ({ reviews })
        
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}

module.exports = controller;