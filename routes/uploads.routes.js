'use strict';
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivosSubir, validarJWT } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, getImagenUrl } = require('../controllers');
const { coleccionesPermitidas } = require('../helpers');
// const FileSystem = require('../classes/file-system');


const router = Router();
// const fileSystem = new FileSystem();


router.post('/', [
    validarJWT,
    validarArchivosSubir
], cargarArchivo);


router.put('/:coleccion/:id', [
    validarArchivosSubir,
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos', 'categorias', 'tiendas', 'post'])),
    validarCampos
], actualizarImagen)

// router.get('/:coleccion/:id', [
//     // validarArchivosSubir,
//     check('id', 'El id no es valido').isMongoId(),
//     check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos', 'categorias', 'tiendas', 'post'])),
//     validarCampos
// ], mostrarImagen)

router.get('/:userId/:coleccion/:img', (req, res) => {

    const userId = req.params.userId;
    const coleccion = req.params.coleccion;
    const img = req.params.img;
    const pathFoto = getImagenUrl(userId, coleccion, img);
    res.sendFile(pathFoto);

})


/*
// Servicio para subir archivos
router.post('/', [validarJWT], (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            msg: 'No se subio ningun archivo'
        });
    }
    const imagen = req.files.imagen;

    if (!imagen) {
        return res.status(400).json({
            msg: 'No se subio ningun archivo -- Imagen'
        });
    }
    if (!imagen.mimetype.includes('image')) {
        return res.status(400).json({
            msg: 'El archivo no es una imagen'
        });
    }
    const fileSystem = new FileSystem(imagen, req.usuario._id);
    console.log(req.usuario._id);
    //fileSystem.guardarImagenTemporal(imagen, req.usuario._id);
    res.status(200).json({
        msg: 'Todo ok',
        imagen: imagen.mimetype
    })
});
*/

module.exports = router;