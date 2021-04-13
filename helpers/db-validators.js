const Role = require('../models/role.models');
const Usuario = require('../models/usuario.models');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`)
    }
}


const existeEmail = async(email) => {

    const Email = await Usuario.findOne({ email });
    if (Email) {
        throw new Error(`El correo: ${email} ya está registrado`)
            // return res.status(400).json({
            //     msg: 'El correo ya está registrado'
            // });
    }
}

const existeUsuarioPorId = async(id) => {

    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`No existe ningún usuario con el id: ${id}`)
            // return res.status(400).json({
            //     msg: 'El correo ya está registrado'
            // });
    }
}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}