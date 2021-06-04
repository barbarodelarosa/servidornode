const { response } = require("express");
const { subirArchivo } = require("../helpers");
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const { Usuario, Categoria, Tienda, Producto, CategoriaTienda, Post } = require('../models')

const cargarArchivo = async(req, res = response) => {

    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     res.status(400).json({
    //         msg: 'No hay archivos para subir'
    //     });
    //     return;
    // }
    // Subir imagenes

    try {
        // La funcion sirve para subir archivos
        if (!req.files.archivo.mimetype.includes('image')) {
            return res.json({
                msg: 'El archivo no es una imagen'
            });
        }

        // SUBE LOS ARCHIVOS PARA LA CARPETA TEMP
        const nombre = await subirArchivo(req.files, `imagenes/${req.usuario._id}/temp`);


        res.json({
            nombre,
            nombreNuevo
        });

    } catch (msg) {
        res.status(400).json({
            msg
        });

    }

}







const actualizarImagen = async(req, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;
    console.log({ coleccion });
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe un usuario con el id: ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe un producto con el id: ${id}`
                })
            }
            break;
        case 'categorias':
            modelo = await Categoria.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe una categoria con el id: ${id}`
                })
            }
            break;
        case 'tiendas':
            modelo = await Tienda.findById(id);
            console.log('Este el case de tiendas', modelo);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe una tienda con el id: ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    // Limpar imagen anterior
    if (modelo.imagen) {
        // Borrar imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
        if (fs.existsSync(pathImagen)) {
            console.log(pathImagen);
            fs.unlinkSync(pathImagen);
        }
    }
    modelo.imagen = await subirArchivo(req.files, coleccion);

    await modelo.save();

    res.json({
        modelo
    })

}




const mostrarImagen = async(req, res = response) => {
    const { coleccion, id } = req.params;

    let modelo;
    console.log({ coleccion });
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe un usuario con el id: ${id}`
                })
            }
            break;
        case 'posts':
            modelo = await Post.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe un post con el id: ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe un producto con el id: ${id}`
                })
            }
            break;
        case 'categorias':
            modelo = await Categoria.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe una categoria con el id: ${id}`
                })
            }
            break;
        case 'tiendas':
            modelo = await Tienda.findById(id);
            console.log('Este el case de tiendas', modelo);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe una tienda con el id: ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    // Limpar imagen anterior
    if (modelo.imagenes) {
        // Borrar imagen del servidor
        const pathImagen = path.resolve(__dirname, '../uploads', coleccion, modelo.imagenes);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    const pathNoImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathNoImagen);

}

const getImagenUrl = (userId, coleccion, img) => {
    const pathImagen = path.resolve(__dirname, '../uploads/imagenes', userId, coleccion, img);
    // crear codigo, si no existe imagen, eviar una imagen por defecto
    return pathImagen;
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    getImagenUrl
}