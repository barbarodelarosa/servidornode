const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.models');

const usuariosGet = async(req, res = response) => {
    // const limite = req.params.limite;
    // const desde = req.params.desde;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    // const usuarios = await Usuario.find(query)
    //     .limit(Number(limite))
    //     .skip(Number(desde));
    // const total = await Usuario.countDocuments(query);
    // Ejecuta en este caso dos promesas juntas por lo que es mas eficiente
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        usuarios
    });
}
const usuariosGetPorId = async(req, res = response) => {

    const query = { estado: true };
    const uid = req.params.id;
    const usuario = await Usuario.findById(uid).find(query);

    res.json({

        usuario
    });
}

const obtenerUsuario = async(req, res = response) => {
    const usuario = req.usuario

    res.json({
        ok: true,
        usuario
    });
}

// REGISTRAR USUARIO
const usuariosPost = async(req, res = response) => {

    const { nombreusuario, contrasena, correo, rol, avatar } = req.body;
    console.log(req.body);
    // Verificar email
    // const existeNombreUsuario = await Usuario.findOne({ nombreusuario });
    // if (existeNombreUsuario) {
    //     return res.status(400).json({
    //         msg: `Ya existe el nombre de usuario ->${existeNombreUsuario.nombreusuario}`
    //     });
    // }
    const usuario = new Usuario({ nombreusuario, contrasena, correo, rol, avatar });

    // Encripta la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.contrasena = bcryptjs.hashSync(contrasena, salt);
    // Guarda en la base de datos
    usuario.save();
    res.json({
        ok: true,
        msg: 'API - POSTTT desde el controlador',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const { _id, contrasena, google, correo, ...resto } = req.body;

    // Validar contra Base de datos
    if (contrasena) {
        const salt = bcryptjs.genSaltSync();
        resto.contrasena = bcryptjs.hashSync(contrasena, salt);
    }

    console.log('Este el valor deresto ANTES:', resto);
    /***
    Es muy importante agregar  { new: true, runValidators: true  } para que este devuel el query
    new: true devuelve el nuevo arreglo y el runValidators: true valida si la informacion cumple los requisitos
    */
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true, runValidators: true });
    console.log('Este el valor de usuario DESPUES:', usuario);

    res.json({
        usuario
    });
}



const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    // Extrae el usuario que viene por el request del middleware
    const usuarioAutenticado = req.usuario;
    // const uid = req.uid;
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        usuario,
        usuarioAutenticado
    });
}

module.exports = {
    usuariosGet,
    obtenerUsuario,
    usuariosPost,
    usuariosPut,
    usuariosGetPorId,
    usuariosDelete
}