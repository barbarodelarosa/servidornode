const Auth = require('./auth.routes');
const Categorias = require('./categorias.routes');
const Productos = require('./productos.routes');
const Usuarios = require('./usuarios.routes');
const CategoriasTiendas = require('./categoria-tienda.routes');
const Post = require('./post.routes');



module.exports = {
    Auth,
    Categorias,
    Productos,
    Usuarios,
    CategoriasTiendas,
    Post
}