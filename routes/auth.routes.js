const { Router } = require('express');
const { check } = require('express-validator');

const {
    login,
    requestRestablecerContrasena,
    verificarCodigoContrasena,
    cambiarContrasena,
} = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos.middlewares');
const { existeEmail, existeUsuarioPorId } = require('../helpers/db-validators.helpers');
const { codigoValido } = require('../helpers/generar-password.helpers');
const { validarJWT } = require('../middlewares/index');

const router = Router();


router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contrasena', 'El contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


router.post('/requestRestablecerContrasena',
    check('correo', 'El correo es obligatorio').isEmail(),
    check('correo').custom(existeEmail),
    validarCampos,
    requestRestablecerContrasena);

router.post('/verificarCodigoContrasena',
    check('codigo').custom(codigoValido),
    // Verificar idToken

    // Verificar token del usuario
    validarJWT,
    verificarCodigoContrasena);

router.post('/cambiarContrasena',
    //Verificar id de usuario
    check('id', 'No es un id válido').isMongoId(),
    // Verificar token
    check('id').custom(existeUsuarioPorId),
    //verificar password

    cambiarContrasena);


// check('contrasena', 'La contraseña debe ser de más de 6 letras').isLength({ min: 6 }),
// check('id', 'No es un id válido').isMongoId(),
//check('id').custom(existeUsuarioPorId),
module.exports = router;