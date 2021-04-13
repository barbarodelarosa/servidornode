 const { Router } = require('express');
 const { check } = require('express-validator');
 const api_usuarios = require('../controllers/usuarios.controllers');
 const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

 const router = Router();
 const { validarCampos } = require('../middlewares/validar-campos');

 router.get('/', api_usuarios.usuariosGet);
 router.post('/', [
     check('name', 'El nombre es obligatorio').not().isEmpty(),
     check('password', 'La contraseña debe ser de más de 6 letras').isLength({ min: 6 }),

     check('email', 'El correo no es valido').isEmail(),
     check('email').custom(existeEmail),
     check('rol').custom(esRolValido),
     //  check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
     validarCampos
 ], api_usuarios.usuariosPost);

 router.put('/:id', [
     check('id', 'No es un id válido').isMongoId(),
     check('id').custom(existeUsuarioPorId),
     check('rol').custom(esRolValido),

     validarCampos
 ], api_usuarios.usuariosPut);


 router.delete('/:id', [
     check('id', 'No es un id válido').isMongoId(),
     check('id').custom(existeUsuarioPorId),
     validarCampos
 ], api_usuarios.usuariosDelete);

 router.patch('/', api_usuarios.usuariosPatch);



 module.exports = router;