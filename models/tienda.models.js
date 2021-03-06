const { Schema, model } = require('mongoose');

const TiendaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    logo: { type: String },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'CategoriaTienda',
        required: [false, 'La categoria es obligatoria']
    },
    disponible: {
        type: Boolean,
        default: true,
        required: true
    },
    descipcion: {
        type: String,
    },

});


TiendaSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...tienda } = this.toObject();
    tienda.uid = _id;
    return tienda;
}


module.exports = model('Tienda', TiendaSchema);