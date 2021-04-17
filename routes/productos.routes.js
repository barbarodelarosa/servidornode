const { Router } = require('express');
const { check } = require('express-validator');

const {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos.controllers');


const { existeProductoPorId } = require('../helpers/db-validators.helpers');

const { existeProducto } = require('../helpers/existe-producto.helpers');
const router = Router();
const {
    validarCampos,
    validarJWT,
    tieneRole
} = require('../middlewares/index');


// Get para obtener todas categoria publico

router.get('/', obtenerProductos);



// Get para obtener una categoria por ID publico

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProductoPorId);

// Crear una categoria privado a cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La Categoria es obligatoria').not().isEmpty(),
    check('categoria', 'No es un id valido de categoria ').isMongoId(),
    // check('id').custom(existeCategoriaPorId),
    // tieneRole('ADMIN_ROLE'),
    validarCampos,
], crearProducto);


// Actualizar por ID

router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id valido de categoria ').isMongoId(),
    check('id', 'No es un id válido de prodducto').isMongoId(),
    check('id').custom(existeProductoPorId),
    // tieneRole('ADMIN_ROLE'),
    validarCampos,
], actualizarProducto);

// Borrar solo si es un ADMIN

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], borrarProducto);

module.exports = router;