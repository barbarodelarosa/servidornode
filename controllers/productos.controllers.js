const { response, request } = require("express");
const { Categoria, Producto, Usuario } = require("../models");


// obtenerProductos - paginado - total - populate
const obtenerProductos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .limit(Number(limite))
        .skip(Number(desde))

        .populate({ path: 'usuario', select: 'name' })
        .populate({ path: 'categoria', select: 'name' })
    ]);
    res.json({
        total,
        productos
    });
}


// obtenerProductoPorId populate

const obtenerProductoPorId = async(req = request, res = response) => {
    const { id } = req.params;
    const { query } = { estado: true }
    const [producto] = await Promise.all([
        Producto.findById(id),
        Producto.find(query)
        .populate({ path: 'usuario', select: 'name' })
        .populate({ path: 'categoria', select: 'name' })
    ]);
    res.json({
        producto
    });

}


// crearProducto
const crearProducto = async(req = request, res = response) => {
    const { estado, usuario, ...body } = req.body;

    // const nombre = req.body.nombre.toUpperCase();

    // const productoDB = await Producto.findOne({ nombre });
    // if (productoDB) {
    //     return res.status(400).json({
    //         msg: `El producto ${productoDB.nombre}, ya existe`
    //     });
    // }


    //Generar datos a guardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();
    res.status(201).json(producto);

}




// actualizarCategoria

const actualizarProducto = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    // Validar contra Base de datos
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })
        .populate({ path: 'usuario', select: 'name' })
        .populate({ path: 'categoria', select: 'name' });

    res.status(201).json(producto);

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

const borrarProducto = async(req, res = response) => {
    const { id } = req.params;

    // Extrae el usuario que viene por el request del middleware
    // const usuarioAutenticado = req.usuario;
    // const uid = req.uid;
    // const usuario = await Usuario.findByIdAndDelete(id);
    const producto = await Producto.findByIdAndUpdate(id, { state: false }, { new: true });
    res.json({
        producto,
        // usuarioAutenticado
    });
}








module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto
}