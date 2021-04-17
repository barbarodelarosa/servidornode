const dbValidators = require('./db-validators.helpers');
const existeCategoria = require('./existe-categoria.helpers');
const generarJWT = require('./generar-jwt.helpers');
const existeProducto = require('./existe-producto.helpers');
const subirArchivo = require('./subir-archivo.helpers');




module.exports = {
    ...dbValidators,
    ...existeCategoria,
    ...generarJWT,
    ...existeProducto,
    ...subirArchivo
}