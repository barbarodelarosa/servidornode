 const generatePasswordRand = (length, type) => {
     switch (type) {
         case 'numero':
             var characters = "0123456789";
             break;
         case 'alfabeto':
             var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
             break;
         case 'alfanumerico':
             var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
             break;
         default:
             var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
             break;
     }
     var pass = "";
     for (i = 0; i < length; i++) {
         if (type == 'rand') {
             pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
         } else {
             pass += characters.charAt(Math.floor(Math.random() * characters.length));
         }
     }
     return pass;
 }
 const existeUsuarioPorId = async(id) => {

     const existeId = await Usuario.findById(id);
     if (!existeId) {
         throw new Error(`No existe ningún usuario con el id: ${id}`)
             // return res.status(400).json({
             //     msg: 'El correo ya está registrado'
             // });
     }
 }
 const codigoValido = (codigo) => {
     // El numero 8 es igual al parametro length para generar al largo de la contrasena
     if (!codigo.length === 8) {
         throw new Error(`El codigo ${codigo}, no es un codigo valido`);
     }
 }

 module.exports = {
     generatePasswordRand,
     codigoValido
 }