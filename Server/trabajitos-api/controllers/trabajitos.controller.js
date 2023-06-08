const Trabajito = require("../models/Trabajito.model");
const debug = require("debug")("app:trabajito-controller");


const controller = {};

/**
 * Esta request permite crear un trabajito, requiere descripcion, fechaInicio, status
 * y el id de la persona a contratar
 */
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


/**
 * Esta request permite encontrar todos los trabajitos
 * con informacion de quien pide el trabajito y quien lo realizara
 */
controller.findAll = async (req, res) =>{
    try {
        const trabajitos = 
            await Trabajito
            .find() //{ hidden: false }
            .populate("id_solicitor status", "name phone email")
            .populate("id_hired", "name phone email");
  
        return res.status(200).json ({ trabajitos })
        
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}


/**
 * Esta request permite encontrar los trabajitos que han sido
 * solicitados por un usuario
 */
controller.findMyRequests = async (req, res) =>{
    try {
        const { _id: userId } = req.user;

        const trabajitos = 
            await Trabajito
            .find({ id_solicitor: userId, hidden: false })
            .populate("id_hired status", "name phone email");
  
        return res.status(200).json ({ trabajitos })
        
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}


/**
 * Esta request permite encontrar los trabajitos que han sido
 * solicitados al usuario por otro (Mis pedidos)
 */
controller.findMyJobs = async (req, res) =>{
    try {
        const { _id: userId } = req.user;

        const trabajito = 
            await Trabajito
            .find({ id_hired: userId })
            .populate("id_solicitor status", "name phone email");
  
        return res.status(200).json ({ trabajito })
        
    } catch (error) {
        debug({error})
        return res.status(500).json({error: "Error interno de servidor"})
    }
}


/**
 * Esta request permite "eliminar" un trabajito de la base por lo que no sera visible
 * de cara al usuario
 */

controller.trabajitoDeletion = async (req, res) => {
    try {
      const { identifier: trabajitoId } = req.params;
      const { _id: userId } = req.user;
  
      //Paso 01: Obtener el trabajito
      //Paso 02: Verificar la pertenencia del trabajito al usuario
      //A tener en cuenta, el trabajito solo podra ser "eliminado" por el usuario que solicita el trabajo
      const trabajito = await Trabajito.findOne({ _id: trabajitoId, id_solicitor: userId });
  
      if (!trabajito) {
        return res.status(404).json({ error: "Trabajito no encontrado" });
      }
  
      //Paso 03: Modificar el valor
      trabajito.hidden = !trabajito.hidden;
  
      //Paso 04: Guardar los cambios
      await trabajito.save();
  
      return res.status(200).json({ message: "Trabajito eliminado" })
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Error interno de servidor" });
    }
}

//HACE FALTA ENCONTRAR UN TRABAJITO POR ID PARA MOSTRA LA INFORMACION QUE SE VE DETALLADA

module.exports = controller;