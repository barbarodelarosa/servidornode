const { Categoria, CategoriaTienda } = require('../models/index');


const existeCategoria = async(id) => {

    const categoria = await Categoria.findById(id);
    // console.log(categoria.nombre);
    // const existeNombre = await Categoria.find(categoria.nombre);
    if (!categoria) {
        // throw new Error(`Ya existe una categoria con el nombre: ${existeNombre}`)
        return res.status(400).json({
            msg: `No la categoria: ${categoria.nombre}`
        });
    }
}
const existeCategoriaTienda = async(id) => {

    const categoria = await CategoriaTienda.findById(id);
    // console.log(categoria.nombre);
    // const existeNombre = await Categoria.find(categoria.nombre);
    if (!categoria) {
        // throw new Error(`Ya existe una categoria con el nombre: ${existeNombre}`)
        return res.status(400).json({
            msg: `No existe la categoria: ${categoria.nombre}`
        });
    }
}

module.exports = {
    existeCategoria,
    existeCategoriaTienda
}