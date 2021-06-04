const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


// ESTA FUNCION FUNCIONA OK

const subirArchivo = (files, carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;

        if (!archivo.mimetype.includes('image')) {
            return reject `El archivo no es una images, es ${archivo.mimetype}`;

        }
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];


        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(nombreTemp);
        });
    });



}

const moverImagensDeTempHaciaPost = (userId = '', pathTemp = '', pathPost = '') => {
    const nuevoPathTemp = path.join(__dirname, '../uploads/', pathTemp);
    const nuevoPathPost = path.join(__dirname, '../uploads/', pathPost);


    //Comprueba si existe el directorio temp sino existe devuelve un arreglo vacio
    if (!fs.existsSync(nuevoPathTemp)) {
        return [];
    }

    if (!fs.existsSync(nuevoPathPost)) {
        fs.mkdirSync(nuevoPathPost)
        console.log('Se creo el path post el path=>>>', nuevoPathPost);
    }
    //Devuelve un arreglo con todas la imagenes que estan en la carpeta temp
    imagenesTemp = fs.readdirSync(nuevoPathTemp) || [];

    // CAMBIA TODOS LOS ARCHIVOS DE LA CARPETA TEMP PARA POST
    imagenesTemp.forEach(imagen => {
        fs.renameSync(`${nuevoPathTemp}/${imagen}`, `${nuevoPathPost}/${imagen}`)
    });




    return imagenesTemp;

    // resolve(imagenesTemp)



}



module.exports = {
    subirArchivo,
    moverImagensDeTempHaciaPost
}