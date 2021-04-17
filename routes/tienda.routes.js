const { Router } = require('express');
const { check } = require('express-validator');

const {
    crearTienda,
    obtenerTiendas,
    obtenerTiendaPorId,
    actualizarTienda,
    borrarTienda
} = require('../controllers/tienda.controllers');


const { existeTiendaPorId } = require('../helpers/db-validators.helpers');

const { existeProducto } = require('../helpers/existe-producto.helpers');
const router = Router();
const {
    validarCampos,
    validarJWT,
    tieneRole
} = require('../middlewares/index');


// Get para obtener todas categoria publico

router.get('/', obtenerTiendas);



// Get para obtener una categoria por ID publico

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeTiendaPorId),
    validarCampos,
], obtenerTiendaPorId);

// Crear una categoria privado a cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la tienda es obligatorio').not().isEmpty(),
    // check('categoria', 'La Categoria es obligatoria').not().isEmpty(),
    // check('categoria', 'No es un id valido de categoria ').isMongoId(),
    // check('id').custom(existeCategoriaPorId),
    tieneRole('ADMIN_ROLE', 'VENTA_ROLE'),
    validarCampos,
], crearTienda);


// Actualizar por ID

router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id valido de categoria ').isMongoId(),
    check('id', 'No es un id de tienda, valido').isMongoId(),
    check('id').custom(existeTiendaPorId),
    tieneRole('ADMIN_ROLE', 'VENTA_ROLE'),
    validarCampos,
], actualizarTienda);

// Borrar solo si es un ADMIN

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de tienda válido').isMongoId(),
    check('id').custom(existeTiendaPorId),
    tieneRole('ADMIN_ROLE', 'VENTA_ROLE'),
    validarCampos,
], borrarTienda);

module.exports = router;