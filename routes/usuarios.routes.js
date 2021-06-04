 const { Router } = require('express');
 const { check } = require('express-validator');
 const api_usuarios = require('../controllers/usuarios.controllers');
 const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators.helpers');

 const router = Router();
 const {
     validarCampos,
     validarJWT,
     tieneRole
 } = require('../middlewares/index');
 //  const { validarCampos } = require('../middlewares/validar-campos');
 //  const { validarJWT } = require('../middlewares/validar-jwt');
 //  const { tieneRole } = require('../middlewares/validar-roles');

 //OPTENER LISTA DE USUARIOS
 router.get('/', [validarJWT], api_usuarios.usuariosGet);


 router.get('/usuario', [
     validarJWT,
     //  check('id', 'No es un id válido').isMongoId(),
     //  check('id').custom(existeUsuarioPorId),

     //  validarCampos
 ], api_usuarios.obtenerUsuario);



 /*
  router.get('/:id', [
      validarJWT,
     check('id', 'No es un id válido').isMongoId(),
     check('id').custom(existeUsuarioPorId),

     validarCampos
 ], api_usuarios.usuariosGetPorId);

 */



 //REGISTRAR USUARIOS
 router.post('/', [
     check('nombreusuario', 'El nombre es obligatorio').not().isEmpty(),
     check('contrasena', 'La contraseña debe ser de más de 6 letras').isLength({ min: 6 }),

     check('correo', 'El correo no es valido').isEmail(),
     check('correo').custom(existeEmail),
     //  check('rol').custom(esRolValido),
     check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE', 'VENTA_ROLE']),
     validarCampos,
 ], api_usuarios.usuariosPost);

 router.put('/:id', [
     check('id', 'No es un id válido').isMongoId(),
     check('id').custom(existeUsuarioPorId),
     //  check('rol').custom(esRolValido),
     //  check('rol', 'No es un rol válidooo').isIn(['ADMIN_ROLE', 'USER_ROLE', 'VENTA_ROLE']),


     validarCampos,
     validarJWT,

 ], api_usuarios.usuariosPut);


 router.delete('/:id', [
     validarJWT,
     //  adminRole,
     tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
     check('id', 'No es un id válido').isMongoId(),
     //  check('id').custom(existeUsuarioPorId),
     //  check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE', 'VENTA_ROLE']),

     validarCampos
 ], api_usuarios.usuariosDelete);

 //  router.patch('/', api_usuarios.usuariosPatch);



 module.exports = router;