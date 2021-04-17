const { response, request } = require("express");
const { Categoria, Usuario } = require("../models");


// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .limit(Number(limite))
        .skip(Number(desde))

        .populate({ path: 'usuario', select: 'name', model: Usuario })
    ]);
    res.json({
        total,
        categorias
    });
}


// obtenerCategoria populate

const obtenerCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const { query } = { estado: true }
    const [categoria] = await Promise.all([
        Categoria.findById(id),
        Categoria.find(query)
        .populate({ path: 'usuario', select: 'name' })
    ]);
    res.json({
        categoria
    });

}



const crearCategoria = async(req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }


    //Generar datos a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);

}




// actualizarCategoria

const actualizarCategoria = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    // Validar contra Base de datos
    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .populate({ path: 'usuario', select: 'name' });

    res.status(201).json(categoria);

    // if (categoriaDB) {
    //     return res.status(400).json({
    //         msg: `Ya existe una categoria: ${categoriaDB.nombre}`
    //     });
    // }
    // const data = {
    //     nombre,
    //     usuario: req.usuario._id
    // }


    /***
    Es muy importante agregar  { new: true, runValidators: true  } para que este devuel el query
    new: true devuelve el nuevo arreglo y el runValidators: true valida si la informacion cumple los requisitos
    */


}


// borrarCategoria - estado: false

const borrarCategoria = async(req, res = response) => {
    const { id } = req.params;

    // Extrae el usuario que viene por el request del middleware
    // const usuarioAutenticado = req.usuario;
    // const uid = req.uid;
    // const usuario = await Usuario.findByIdAndDelete(id);
    const categoria = await Categoria.findByIdAndUpdate(id, { state: false }, { new: true });
    res.json({
        categoria,
        // usuarioAutenticado
    });
}








module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}