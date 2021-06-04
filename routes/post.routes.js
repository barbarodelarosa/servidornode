const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearPost,
    obtenerPost,
    obtenerPostPorId,
    actualizarPost,
    borrarPost

} = require('../controllers');
const { existePostPorId } = require('../helpers/db-validators.helpers');

const { existeCategoria } = require('../helpers/existe-categoria.helpers');
const router = Router();
const {
    validarCampos,
    validarJWT,
    tieneRole
} = require('../middlewares/index');
//  const { validarCampos } = require('../middlewares/validar-campos');
//  const { validarJWT } = require('../middlewares/validar-jwt');
//  const { tieneRole } = require('../middlewares/validar-roles');


// Get para obtener todas categoria publico
router.get('/', obtenerPost);



// Get para obtener una categoria por ID publico

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existePostPorId),
    validarCampos,
], obtenerPostPorId);

// Crear una categoria privado a cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('mensaje', 'Es obligatorio el mensaje').not().isEmpty(),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], crearPost);


// Actualizar por ID

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existePostPorId),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], actualizarPost);

// Borrar solo si es un ADMIN

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existePostPorId),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], borrarPost);



module.exports = router;