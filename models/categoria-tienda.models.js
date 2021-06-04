const { Schema, model } = require('mongoose');

const CategoriaTiendaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    imagen: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});


CategoriaTiendaSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...categoriaTienda } = this.toObject();
    categoriaTienda.uid = _id;
    return categoriaTienda;
}


module.exports = model('CategoriaTienda', CategoriaTiendaSchema);