const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombreusuario: {
        type: String,
        required: [true, 'El nombre es requerido'],


    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    nombre: { type: String },
    primerapellido: { type: String },
    segundoapellido: { type: String },
    fechadenacimiento: { type: String },
    telefono: { type: String },
    movil: { type: String },
    pais: { type: String, default: "Cuba" },
    provincia: { type: String },
    municipio: { type: String },
    localidad: { type: String },
    direccion: { type: String },
    sitioweb: { type: String },
    avatar: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTA_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
});

// Funcion para borrar del JSON los campos password y __v 
// no deja que esos campos se muestren y solo se quedan en la BD 

UsuarioSchema.methods.toJSON = function() {
    const { __v, contrasena, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);