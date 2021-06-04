const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearCategoriaTienda,
    obtenerCategoriasTiendas,
    obtenerCategoriaTiendaPorId,
    actualizarCategoriaTienda,
    borrarCategoriaTienda
} = require('../controllers');
const { existeCategoriaTiendaPorId } = require('../helpers/db-validators.helpers');

const { existeCategoria, existeCategoriaTienda } = require('../helpers/existe-categoria.helpers');
const { existeRequest } = require('../helpers/existe-request.helpers');
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
router.get('/', obtenerCategoriasTiendas);



// Get para obtener una categoria por ID publico

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    // check('id').custom(existeCategoria),
    check('id').custom(existeCategoriaTienda),
    validarCampos,
], obtenerCategoriaTiendaPorId);

// Crear una categoria privado a cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], crearCategoriaTienda);


// Actualizar por ID

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaTienda), // verifica que se el ID de una categoria de tienda
    // check('id').custom(existeRequest), // verificar ti trae algo el request
    check('id').custom(existeCategoriaTiendaPorId), // verifica que no exista otra categoria con el mismo nombre
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], actualizarCategoriaTienda);

// Borrar solo si es un ADMIN

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaTienda),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], borrarCategoriaTienda);





module.exports = router;