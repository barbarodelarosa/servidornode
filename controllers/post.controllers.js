const { response, request } = require("express");
const { Tienda, Usuario, Post } = require("../models");
const { moverImagensDeTempHaciaPost } = require("../helpers");


// obtenerProductos - paginado - total - populate
const obtenerPost = async(req, res = response) => {

    const { limite = 20 } = req.query;
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * limite;
    const query = { estado: true };
    const [total, posts] = await Promise.all([
        Post.countDocuments(query),
        Post.find(query)
        .limit(Number(limite))
        .skip(skip)
        .sort({ updatedAt: -1 })
        .populate({ path: 'usuario', select: 'nombreusuario avatar correo' })
        .populate({ path: 'tienda', select: 'nombre logo' })
        .exec()

    ]);
    res.json({
        total,
        pagina,
        posts
    });
}


// obtenerProductoPorId populate

const obtenerPostPorId = async(req = request, res = response) => {
    const { id } = req.params;
    const query = { estado: true }
    const [post] = await Promise.all([
        Post.findById(id)
        .find(query)
        .populate({ path: 'usuario', select: 'name' })
        .populate({ path: 'tienda', select: 'name' })
    ]);
    res.json({
        post
    });

}


// crearProducto
const crearPost = async(req = request, res = response) => {
    const { usuario, ...body } = req.body;

    console.log('ANTES Imagenes BDY', body.imagenes);
    // funcion para mover la imagens de temp hacia post EL SEGUNDO ARGUMENTO DEFINE CUAL SERA LA CARPETA DESTINO FINAL 
    const imagenes = moverImagensDeTempHaciaPost(req.usuario._id, `imagenes/${req.usuario._id}/temp`, `imagenes/${req.usuario._id}/post`);

    body.imagenes = imagenes;


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
        mensaje: body.mensaje,
        usuario: req.usuario._id
    }

    const post = new Post(data);

    await post.save();
    res.status(201).json(data);

}




// actualizarCategoria

const actualizarPost = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre;
    }
    data.usuario = req.usuario._id;

    // Validar contra Base de datos
    const post = await Post.findByIdAndUpdate(id, data, { new: true })
        .populate({ path: 'usuario', select: 'name' })
        .populate({ path: 'tienda', select: 'nombre' });

    res.status(201).json(post);


}


// borrarCategoria - estado: false

const borrarPost = async(req, res = response) => {
    const { id } = req.params;

    // Extrae el usuario que viene por el request del middleware
    // const usuarioAutenticado = req.usuario;
    // const uid = req.uid;
    // const usuario = await Usuario.findByIdAndDelete(id);
    const post = await Post.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        post,
        // usuarioAutenticado
    });
}




module.exports = {
    crearPost,
    obtenerPost,
    obtenerPostPorId,
    actualizarPost,
    borrarPost
}