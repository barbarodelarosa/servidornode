const { response, request } = require("express");
const { CategoriaTienda, Usuario } = require("../models");


// obtenerCategorias - paginado - total - populate
const obtenerCategoriasTiendas = async(req, res = response) => {


    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, categoriasTiendas] = await Promise.all([
        CategoriaTienda.countDocuments(query),
        CategoriaTienda.find(query)
        .limit(Number(limite))
        .skip(Number(desde))

        .populate({ path: 'usuario', select: 'name', model: Usuario })
    ]);
    res.json({
        total,
        categoriasTiendas
    });
}


// obtenerCategoria populate

const obtenerCategoriaTiendaPorId = async(req = request, res = response) => {
    const { id } = req.params;
    console.log('Params', req.params);
    const { query } = { estado: true }
    const [categoriaTienda] = await Promise.all([
        CategoriaTienda.findById(id),
        CategoriaTienda.find(query)
        .populate({ path: 'usuario', select: 'name' })
    ]);
    res.json({
        categoriaTienda
    });

}



const crearCategoriaTienda = async(req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaTiendaDB = await CategoriaTienda.findOne({ nombre });
    if (categoriaTiendaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaTiendaDB.nombre}, ya existe`
        });
    }


    //Generar datos a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoriaTienda = new CategoriaTienda(data);

    await categoriaTienda.save();

    res.status(201).json(categoriaTienda);

}




// actualizarCategoria

const actualizarCategoriaTienda = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    // Validar contra Base de datos
    const categoriaTienda = await CategoriaTienda.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .populate({ path: 'usuario', select: 'name' });

    res.status(201).json(categoriaTienda);


    /***
    Es muy importante agregar  { new: true, runValidators: true  } para que este devuel el query
    new: true devuelve el nuevo arreglo y el runValidators: true valida si la informacion cumple los requisitos
    */


}


// borrarCategoria - estado: false

const borrarCategoriaTienda = async(req, res = response) => {
    const { id } = req.params;

    // Extrae el usuario que viene por el request del middleware
    // const usuarioAutenticado = req.usuario;
    // const uid = req.uid;
    // const usuario = await Usuario.findByIdAndDelete(id);
    const categoriaTienda = await CategoriaTienda.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        categoriaTienda,
        // usuarioAutenticado
    });
}








module.exports = {
    crearCategoriaTienda,
    obtenerCategoriasTiendas,
    obtenerCategoriaTiendaPorId,
    actualizarCategoriaTienda,
    borrarCategoriaTienda
}