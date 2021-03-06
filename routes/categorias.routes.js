const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias.controllers');
const { existeCategoriaPorId } = require('../helpers/db-validators.helpers');

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
router.get('/', obtenerCategorias);



// Get para obtener una categoria por ID publico

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
], obtenerCategoria);

// Crear una categoria privado a cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], crearCategoria);


// Actualizar por ID

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], actualizarCategoria);

// Borrar solo si es un ADMIN

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], borrarCategoria);





module.exports = router;