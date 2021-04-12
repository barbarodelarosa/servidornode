const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'API - Get desde el controlador '
    });
}


const usuariosPost = (req, res = response) => {
    const body = req.body;
    res.json({
        ok: true,
        msg: 'API - POST desde el controlador',
        body
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        ok: true,
        msg: 'API - PUT desde el controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'API - PATCH desde el controlador'
    });
}


const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'API - DELETE desde el controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}