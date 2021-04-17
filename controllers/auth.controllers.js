const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.models');
const { generarJWT } = require('../helpers/generar-jwt.helpers');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar si existe el email
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario ó constrseña no son correctos -correo'
            });
        }

        // Si el usuario esta activo
        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario ó constrseña no son correctos -Estado falso'
            });
        }

        //Verificar la contrasena
        const passwordValid = bcryptjs.compareSync(password, usuario.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'Usuario ó constrseña no son correctos - Password '
            });
        }


        //Generar el jwt
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login OK',
            token,
            email,
            password
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal, hable con el administrador'
        });

    }

}



module.exports = {
    login
}