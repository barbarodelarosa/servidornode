const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.models');



const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });

    }

    try {
        // Extrae UID del token
        const { uid } = jwt.verify(token, process.env.SECRECTPRIVATEKEY);

        //Busca al usuario para enviarlo por el request
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en BD'
            });
        }
        req.usuario = usuario;
        // Verifica si el usuario esta activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado false'
            });
        }

        req.uid = uid;

        next()
    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        });
    }


}


module.exports = {
    validarJWT
}