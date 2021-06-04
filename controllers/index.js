const Auth = require('./auth.controllers');
const Categorias = require('./categorias.controllers');
const Productos = require('./productos.controllers');
const Usuarios = require('./usuarios.controllers');
const Uploads = require('./uploads.controllers');
const CategoriasTiendas = require('./categoria-tienda.controllers')
const Posts = require('./post.controllers');


module.exports = {
    ...Auth,
    ...Categorias,
    ...Productos,
    ...Usuarios,
    ...Uploads,
    ...CategoriasTiendas,
    ...Posts
}