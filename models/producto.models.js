const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
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
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        // required: true,

    },
    disponible: {
        type: Boolean,
        default: true,
        required: true
    },
    descipcion: {
        type: String,
    },
    precio: {
        type: Number,
    },
    img: {
        type: String,
    },

});


ProductoSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...producto } = this.toObject();
    producto.uid = _id;
    return producto;
}


module.exports = model('Producto', ProductoSchema);