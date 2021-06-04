// const Role = require('../models/role.models');
// const Usuario = require('../models/usuario.models');
const { Usuario, Categoria, CategoriaTienda, Role, Producto, Tienda, Post } = require('../models/index')

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    console.log(existeRol);
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`)
    }
}


const existeEmail = async(correo) => {

    const Email = await Usuario.findOne({ correo });
    if (Email) {
        throw new Error(`Ya existe una cuenta con el correo: ${correo}`)
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

const existeCategoriaPorId = async(id) => {

    const existeId = await Categoria.findById(id);
    if (!existeId) {
        throw new Error(`No existe categoria con el id: ${id}`)
            // return res.status(400).json({
            //     msg: 'El correo ya está registrado'
            // });
    }
}
const existePostPorId = async(id) => {

    const existeId = await Post.findById(id);
    if (!existeId) {
        throw new Error(`No existe Post con el id: ${id}`)
            // return res.status(400).json({
            //     msg: 'El correo ya está registrado'
            // });
    }
}
const existeCategoriaTiendaPorId = async(id) => {

    const existeId = await CategoriaTienda.findById(id);
    if (!existeId) {
        throw new Error(`No existe categoria con el id: ${id}`)
            // return res.status(400).json({
            //     msg: 'El correo ya está registrado'
            // });
    }
}
const existeProductoPorId = async(id) => {

    const existeId = await Producto.findById(id);
    if (!existeId) {
        throw new Error(`No existe producto con el id: ${id}`)
            // return res.status(400).json({
            //     msg: 'El correo ya está registrado'
            // });
    }
}
const existeTiendaPorId = async(id) => {

    const existeId = await Tienda.findById(id);
    if (!existeId) {
        throw new Error(`No existe tienda con el id: ${id}`)
            // return res.status(400).json({
            //     msg: 'El correo ya está registrado'
            // });
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion}, no es permitida: ${colecciones}`);
    }

    return true
}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeTiendaPorId,
    coleccionesPermitidas,
    existeCategoriaTiendaPorId,
    existePostPorId
}