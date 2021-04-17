const { Producto } = require('../models/producto.models');


const existeProducto = async(id) => {

    const producto = await Producto.findById(id);
    // const existeNombre = await Categoria.find(categoria.nombre);
    if (!producto) {
        throw new Error(`No existe producto con el id: ${producto.nombre}`);
        // return res.status(400).json({
        //     msg: `No existe producto con el id: ${producto.nombre}`
        // });
    }
}


module.exports = {
    existeProducto
}