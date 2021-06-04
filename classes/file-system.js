'use strict';
const path = require('path');
const fs = require('fs');

module.exports.FileSystem = class FileSystem {
    constructor(file, userId) {
        this.file = file;
        this.userId = userId;
        console.log('Sevreo correctamente');

    }

    // guardarImagenTemporal(file, userId) {
    //     console.log(userId);
    //     const path = this.crearCarpetaUsuario(userId);
    //     return path;
    // }

    // crearCarpetaUsuario(userId) {
    //     console.log(userId);
    //     const pathUser = path.resolve(__dirname, '../uploads', userId);
    //     const pathUserTemp = pathUser + 'temp';
    //     console.log(pathUser);

    //     const existe = fs.existsSync(pathUser);
    //     if (!existe) {
    //         fs.mkdirSync(pathUser);
    //         fs.mkdirSync(pathUserTemp);
    //     }
    //     return pathUserTemp;
    // }
};


// exports.exports = {
//         guardarImagenTemporal,
//     }
// exports.exports = FileSystem;