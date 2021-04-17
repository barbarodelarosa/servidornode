const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivosSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();


router.post('/', validarArchivosSubir, cargarArchivo);


router.put('/:coleccion/:id', [
    validarArchivosSubir,
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos', 'categorias', 'tiendas'])),
    validarCampos
], actualizarImagen)

router.get('/:coleccion/:id', [
    // validarArchivosSubir,
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos', 'categorias', 'tiendas'])),
    validarCampos
], mostrarImagen)

module.exports = router;