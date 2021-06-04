const { response, request } = require("express");
const { CategoriaTienda } = require('../models/index');



const existeRequest = (req = request, res = response) => {


    if (!req.body) {
        // throw new Error(`Ya existe una categoria con el nombre: ${existeNombre}`)
        return res.status(400).json({
            msg: `No hay informacion para actualizar`
        });
    }
}

module.exports = {
    existeRequest
}