const user = require("../models/TUser.model");
const Trabajito = require("../models/Trabajito.model");


const controller = {};

controller.create = async (req, res) => {
    try {
        const {description, dateInit, dateFinish, endNumber, state} = req.body;

        const { _id: userId } = req.user;

        const trabajito = new Trabajito({
            description: description,
            dateInit: dateInit,
            dateFinish: dateFinish,
            endNumber: endNumber,
            state: state,
            user: userId
        });

        const newTrabajito = await trabajito.save();

        if (!newTrabajito){
            return res.status (409).json ({error :"Ocurrio un error al tratar de crear un trabajito = JobRequest"});
        }

        return res.status(201).json(newTrabajito);
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}


// aca hay que pensar como hacer para que el usuario pueda ver sus trabajitos con los estados que tiene en cada momento


controller.findAll = async (req, res) =>{
    try {
        const trabajito = 
            await Trabajito
            .find({ hidden: false })
            .populate("user", "username email");
  
        return res.status(200).json ({ trabajito })
        
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}

controller.togglePostVisibility = async (req, res) => {
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
}