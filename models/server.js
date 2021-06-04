const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config.database');



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
                auth: '/api/auth',
                categorias: '/api/categorias',
                usuarios: '/api/usuarios',
                productos: '/api/productos',
                tiendas: '/api/tiendas',
                uploads: '/api/uploads',
                categoriastiendas: '/api/categoriastiendas',
                post: '/api/post'
            }
            // this.usuariosPath = '/api/usuarios';
            // this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();


        //Rutas de la aplicacion

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        //Directorio publico
        this.app.use(express.static('public'));
        //Lectura y parseo del body
        this.app.use(express.json());

        //FileUpload Carga de archivos
        this.app.use(fileUpload({
            useTemplateFiles: true,
            tempFileDir: '/temp/',
            // *****DANGER DA PERMISO PARA CREAR UN DIRECTORIO A LA FUNCION .mv
            createParentPath: true
        }));

    }

    routes() {

        this.app.use(this.path.auth, require('../routes/auth.routes'));
        this.app.use(this.path.categorias, require('../routes/categorias.routes'));
        this.app.use(this.path.usuarios, require('../routes/usuarios.routes'));
        this.app.use(this.path.productos, require('../routes/productos.routes'));
        this.app.use(this.path.tiendas, require('../routes/tienda.routes'));
        this.app.use(this.path.uploads, require('../routes/uploads.routes'));
        this.app.use(this.path.categoriastiendas, require('../routes/categoria-tienda.routes'));
        this.app.use(this.path.post, require('../routes/post.routes'));

    }




    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port);
        })
    }
}


module.exports = {
    Server
};