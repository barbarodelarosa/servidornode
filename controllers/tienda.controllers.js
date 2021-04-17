const { response, request } = require("express");
const { Tienda, Usuario } = require("../models");


// obtenerCategorias - paginado - total - populate
const obtenerTiendas = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, tiendas] = await Promise.all([
        Tienda.countDocuments(query),
        Tienda.find(query)
        .limit(Number(limite))
        .skip(Number(desde))

        .populate({ path: 'usuario', select: 'name' })
    ]);
    res.json({
        total,
        tiendas
    });
}


// obtenerCategoria populate

const obtenerTiendaPorId = async(req = request, res = response) => {
    const { id } = req.params;
    const { query } = { estado: true }
    const [tienda] = await Promise.all([
        Tienda.findById(id),
        Tienda.find(query)
        .populate({ path: 'usuario', select: 'name' })
    ]);
    res.json({
        tienda
    });

}



const crearTienda = async(req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const tiendaDB = await Tienda.findOne({ nombre });
    if (tiendaDB) {
        return res.status(400).json({
            msg: `Ya existe una tienda con el nombre: ${tiendaDB.nombre}`
        });
    }


    //Generar datos a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const tienda = new Tienda(data);

    await tienda.save();

    res.status(201).json(tienda);

}




// actualizarCategoria

const actualizarTienda = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    // Validar contra Base de datos
    const tienda = await Tienda.findByIdAndUpdate(id, data, { new: true })
        .populate({ path: 'usuario', select: 'name' });

    res.status(201).json(tienda);

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

const borrarTienda = async(req, res = response) => {
    const { id } = req.params;

    // Extrae el usuario que viene por el request del middleware
    // const usuarioAutenticado = req.usuario;
    // const uid = req.uid;
    // const usuario = await Usuario.findByIdAndDelete(id);
    const tienda = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        tienda,
        // usuarioAutenticado
    });
}








module.exports = {
    crearTienda,
    obtenerTiendas,
    obtenerTiendaPorId,
    actualizarTienda,
    borrarTienda
}