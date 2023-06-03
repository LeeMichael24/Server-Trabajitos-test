const User = require("../models/TUser.model");
const Trabajito = require("../models/Trabajito.model");
const debug = require("debug")("app:trabajito-controller");


const controller = {};

controller.create = async (req, res) => {
    try {
        const {description, dateInit, status, id_hired} = req.body;

        const { _id: userId } = req.user;

        const trabajito = new Trabajito({
            description: description,
            dateInit: dateInit,
            status: status,
            id_solicitor: userId,
            id_hired: id_hired
        });

        const newTrabajito = await trabajito.save();

        if (!newTrabajito){
            return res.status (409).json ({error :"Ocurrio un error al tratar de crear un trabajito"});
        }

        return res.status(201).json(newTrabajito);
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}

//Confirmation tentativo
controller.confirmation = async (req, res) => {
    try {
        const {_id: trabajitoId ,dateFinish} = req.body;

        const trabajito = await Trabajito.findOne({ _id: trabajitoId});

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

controller.findAll = async (req, res) =>{
    try {
        const trabajito = 
            await Trabajito
            .find({ hidden: false })
            .populate("id_solicitor id_hired status");
  
        return res.status(200).json ({ trabajito })
        
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