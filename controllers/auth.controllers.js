const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.models');
const Token = require('../models/Token.models');
const sendEmail = require('../utils/email/sendEmail');
const { generatePasswordRand } = require('../helpers/generar-password.helpers');
const { generarJWT } = require('../helpers/generar-jwt.helpers');

const login = async(req, res = response) => {
    const { correo, contrasena } = req.body;
    try {
        // Verificar si existe el email
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario ó constrseña no son correctos -correo'
            });
        }
        // Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario ó constrseña no son correctos -Estado falso'
            });
        }
        //Verificar la contrasena
        const passwordValid = bcryptjs.compareSync(contrasena, usuario.contrasena);
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'Usuario ó constrseña no son correctos - Password '
            });
        }
        //Generar el jwt
        const token = await generarJWT(usuario.id);
        res.json({
            msg: 'Login OK',
            ok: true,
            token,
            correo,
            contrasena
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal, hable con el administrador',
            ok: false
        });

    }

}

const requestRestablecerContrasena = async(req, res) => {

    const { correo } = req.body;

    try {
        // Verificar si existe el email
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'No existe usuario con ese correo'
            });
        }

        // Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'No existe usuario con ese correo- estado falso'
            });
        }

        //Guardar usuario con el token especializado y codigo generado
        const codigo = generatePasswordRand(8, 'alfanumerico');
        //Generar el jwt
        const token = await generarJWT(usuario.id);
        const userId = usuario.id;
        const tokenResetPassword = new Token({ userId, token, codigo });
        tokenResetPassword.save();

        // Enviar email codigo para restablecer constrasena
        sendEmail(
            usuario.correo,
            "Password Reset Request", {
                name: usuario.nombreusuario,
                codigo,
            },
            "./template/requestResetPassword.handlebars"
        );

        res.json({
            msg: 'Login OK',
            ok: true,
            token,
            correo,
            codigo,
            userId,
            idToken: tokenResetPassword._id
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal, hable con el administrador'
        });

    }


}





const verificarCodigoContrasena = async(req, res) => {

    const idToken = req.params.idToken;
    const token = req.params.token;
    // const idToken = req.body.idToken;
    // const token = req.body.token;
    const codigo = req.body.codigo;

    try {
        // Verificar si existe el codigo
        const nuevoToken = await Token.findById(idToken);
        console.log('Nuevo token', nuevoToken.userId);
        if (!nuevoToken) {
            return res.status(400).json({
                msg: 'Ah ocurrido algun erro debe cambiar el codigo'
            });
        }
        const userId = nuevoToken.userId;
        const usuario = await Usuario.findById(userId);

        return res.json({
            msg: 'Verificacion de codigo OK',
            ok: true,
            token,
            id,
            codigo,
            usuario
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal, hable con el administrador'
        });

    }

}

//Se utiliza cuando el usuario esta conectado o cuando se restablece la contrasena
const cambiarContrasena = async(req, res) => {

    const { idUsuario, token, contrasenaPlana } = req.body;

    // Verifica que el token sea valido

    try {
        // Verificar si existe el codigo
        const tempUsuario = await Usuario.findById(idUsuario);
        if (contrasenaPlana) {
            const salt = bcryptjs.genSaltSync();
            tempUsuario.contrasena = bcryptjs.hashSync(contrasenaPlana, salt);
        }

        console.log(tempUsuario);
        const usuario = await Usuario.findByIdAndUpdate(idUsuario, tempUsuario, { new: true, runValidators: true });
        console.log('Usuario despues', usuario);
        if (!usuario) {
            return res.status(400).json({
                msg: 'Ah ocurrido un error con el usuario, contactar con administrador'
            });
        }

        return res.json({
            msg: 'Todo OK',
            ok: true,
            usuario
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal, contactar con el administrador'
        });

    }


}



module.exports = {
    login,
    requestRestablecerContrasena,
    verificarCodigoContrasena,
    cambiarContrasena,
}