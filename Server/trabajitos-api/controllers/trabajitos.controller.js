const Trabajito = require("../models/Trabajito.model");
const debug = require("debug")("app:trabajito-controller");


const controller = {};

/**
 * Esta request permite crear un trabajito, requiere descripcion, fechaInicio, status
 * y el id de la persona a contratar    status = "Pending"
 */
controller.create = async (req, res) => {
    try {
        const { description, dateInit, status, id_hired } = req.body;
        const { _id: userId } = req.user;

        const trabajito = new Trabajito({
            description: description,
            dateInit: dateInit,
            status: status,
            id_solicitor: userId,
            id_hired: id_hired
        });

        const newTrabajito = await trabajito.save();

        if (!newTrabajito) {
            return res.status(409).json({ error: "Ocurrio un error al tratar de crear un trabajito" });
        }

        return res.status(201).json(newTrabajito);
    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
    }
}

/**
 * Esta request permite al trabajador iniciar un trabajito, requiere el id del Trabajito, fechaFin, status
 * y el id del trabajador     status = "On Progress"
 */
controller.startTrabajito = async (req, res) => {
    try {
        const { id: trabajitoId, dateFinish, status } = req.body;
        const { _id: userID } = req.user;

        const trabajito = await Trabajito.findOne({ _id: trabajitoId, id_hired: userID });

        if (!trabajito) {
            return res.status(404).json({ error: "Trabajito no encontrado" });
        }

        trabajito.dateFinish = dateFinish;
        trabajito.status = status;
        
        const updatedTrabajito = await trabajito.save()
        if (!updatedTrabajito) {
            return res.status(409).json({ error: "Ocurrio un error al tratar de actualizar un trabajito" });
        }

        return res.status(201).json(updatedTrabajito);


    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
    }
}

/**
 * Esta request permite al trabajador finalizar un trabajito, requiere el id del Trabajito, numero que
 * se genera de manera random en FRONT y el id del trabajador 
 */
controller.endTrabajito = async (req, res) => {
    try {
        const { id: trabajitoId, endNumber } = req.body;
        const { _id: userID } = req.user;

        const trabajito = await Trabajito.findOne({ _id: trabajitoId, id_hired: userID });

        if (!trabajito) {
            return res.status(404).json({ error: "Trabajito no encontrado" });
        }

        trabajito.endNumber = endNumber;
        
        const updatedTrabajito = await trabajito.save()
        if (!updatedTrabajito) {
            return res.status(409).json({ error: "Ocurrio un error al tratar de actualizar el trabajito" });
        }

        return res.status(201).json(updatedTrabajito);


    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
    }
}

/**
 * Esta request permite al contratador confirmar que un trabajito finalizo, requiere el id del Trabajito, endNumber, status
 * y el id de la persona solicitante     status = "Completed"
 */
controller.endConfirmationTrabajito = async (req, res) => {
    try {
        const { id: trabajitoId, endNumber, status } = req.body;
        const { _id: userID } = req.user;

        const trabajito = await Trabajito.findOne({ _id: trabajitoId, id_solicitor: userID });

        if (!trabajito) {
            return res.status(404).json({ error: "Trabajito no encontrado" });
        }

        if(endNumber !== trabajito.endNumber){
            return res.status(500).json({ error: "El numero de confirmacion no es valido" })
        }

        trabajito.status = status;

        const updatedTrabajito = await trabajito.save()
        if (!updatedTrabajito) {
            return res.status(409).json({ error: "Ocurrio un error al tratar de actualizar el trabajito" });
        }

        return res.status(201).json(updatedTrabajito);


    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
    }
}

/**
 * Esta request permite encontrar todos los trabajitos
 * con informacion de quien pide el trabajito y quien lo realizara
 */
controller.findAll = async (req, res) => {
    try {
        const trabajitos =
            await Trabajito
                .find() //{ hidden: false }
                .populate("id_solicitor status", "name phone email")
                .populate("id_hired", "name phone email");

        if (!trabajitos) {
            return res.status(404).json({ error: "Trabajito no encontrado" });
        }

        return res.status(200).json({ trabajitos })

    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
    }
}


/**
 * Esta request permite encontrar todos los trabajitos que han sido
 * solicitados por un usuario
 */
controller.findMyRequests = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const trabajitos =
            await Trabajito
                .find({ id_solicitor: userId, hidden: false })
                .populate("id_hired status", "name phone email");

        if (!trabajitos) {
            return res.status(404).json({ error: "Trabajito no encontrado" });
        }

        return res.status(200).json({ trabajitos })

    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
    }
}

/**
 * Esta request permite encontrar UN trabajito (en especifico) que ha sido
 * solicitado por un usuario
 */
controller.findRequestById = async (req, res) => {
    try {
        const { identifier } = req.params;
        const { _id: userId } = req.user;

        const trabajito =
            await Trabajito
                .findOne({ _id: identifier, id_solicitor: userId })
                .populate("id_hired status", "name phone email municipality");
                //.populate("municipality", "name");

        if (!trabajito) {
            return res.status(404).json({ error: "Trabajito no encontrado" });
        }

        return res.status(200).json({ trabajito })

    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
    }
}


/**
 * Esta request permite encontrar los trabajitos que han sido
 * solicitados al usuario por otro (Mis pedidos)
 */
controller.findMyJobs = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const trabajitos =
            await Trabajito
                .find({ id_hired: userId })
                .populate("id_solicitor status", "name phone email");

        if (!trabajitos) {
            return res.status(404).json({ error: "Trabajito no encontrado" });
        }

        return res.status(200).json({ trabajitos })

    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
    }
}

/**
 * Esta request permite encontrar UN trabajito (especifico) que ha sido
 * solicitado al usuario por otro (Mis pedidos)
 */
controller.findJobById = async (req, res) => {
    try {
        const { identifier } = req.params;
        const { _id: userId } = req.user;

        const trabajito =
            await Trabajito
                .find({ _id: identifier, id_hired: userId })
                .populate("id_solicitor status", "name phone email municipality");

        if (!trabajito) {
            return res.status(404).json({ error: "Trabajito no encontrado" });
        }

        return res.status(200).json({ trabajito })

    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
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

module.exports = controller;