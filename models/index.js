const Categoria = require('./categoria.models');
const Role = require('./role.models');
const Server = require('./server');
const Usuario = require('./usuario.models');
const Producto = require('./producto.models');
const Tienda = require('./tienda.models');
const CategoriaTienda = require('./categoria-tienda.models');
const Post = require('./post.models');



module.exports = {
    Categoria,
    Role,
    Server,
    Usuario,
    Producto,
    Tienda,
    CategoriaTienda,
    Post
}