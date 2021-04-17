const validarCampos = require('./validar-campos.middlewares');
const validarJWT = require('./validar-jwt.middlewares');
const tieneRole = require('./validar-roles.middlewares');
const validarArchivosSubir = require('./validar-archivo-middlewares')


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRole,
    ...validarArchivosSubir
}