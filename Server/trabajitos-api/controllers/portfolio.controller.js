
const Portfolio = require("../models/TPortfolio.model");
const debug = require("debug")("app:portfolio-controller");


const controller = {};

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

//Confirmation tentativo
controller.confirmation = async (req, res) => {
    try {
        const {_id: trabajitoId ,dateFinish} = req.body;

        const trabajito = await Portfolio.findOne({ _id: trabajitoId});

        if (!trabajito) {
            return res.status(404).json({ error: "Trabajito no encontrado" });
        }

        trabajito.dateFinish = dateFinish;
        //trabajito.status = 

        
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}


// aca hay que pensar como hacer para que el usuario pueda ver sus trabajitos con los estados que tiene en cada momento

//en esta parte seria cuando el usuario quiere 
//ver sus trabajitos que tiene en el momento


//find() es para buscar todos los trabajitos sin ningun parametro
//populate() es para traer los datos de la relacion, campos del esquema


//cuando vamos a buscar usuarios o trabajos no se requieren campos enviados desde imsonia.
controller.findAll = async (req, res) =>{
    try {
        const portfolios = 
            await Portfolio
            .find()
            .populate("user category reviews");
  
        return res.status(200).json ({ portfolios })
        
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}

module.exports = controller;


//aca tenemos que hacer la parte en la que el usuario pueda ver los trabajitos pero
// desde modo contratante

/* controller.togglePostVisibility = async (req, res) => {
    try {
      const { identifier: trabajitoId } = req.params;
      const { _id: userId } = req.user;
  
      //Paso 01: Obtenemos el post
      //Paso 02: Verificamos la pertenencia del post al usuario
      const trabajito = await Trabajito.findOne({ _id: trabajitoId, user: userId });
  
      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio no encontrado" });
      }
  
      //Paso 03: Modifico el valor
      trabajito.hidden = !trabajito.hidden;
  
      //Paso 04: Guardo los cambios
      await trabajito.save();
  
      return res.status(200).json({ message: "Portfolio actualizado" })
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Error interno de servidor" });
    }
} */