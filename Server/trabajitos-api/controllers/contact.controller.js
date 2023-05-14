const Contact = require("../models/Contact.model");
const debug = require("debug")("app:contact-controller");


const controller = {};

controller.create = async (req, res) => {
    try {
        const { email, description } = req.body;


        const contact = new Contact({
            email : email,
            description: description
        });

        const newContact = await contact.save();

        if (!newContact) {
            return res.status(409).json({ error: "Ocurrio un error al crear un post" });
        }

        return res.status(201).json(newContact);

    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
    }
}