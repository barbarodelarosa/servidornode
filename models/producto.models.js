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
        required: [true, 'El usuario es requerido']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoria es requerida']

    },
    tienda: {
        type: Schema.Types.ObjectId,
        ref: 'Tienda',
        required: [true, 'La tienda es requerida']
    },
    disponible: {
        type: Boolean,
        default: true,
        required: true
    },
    detalles: {
        type: String,
    },
    codigo: {
        type: String,
    },
    enlace: {
        type: String,
    },
    precio: {
        type: Number,
    },
    imagen: [{
        type: String,
    }],
    comentario: [{
        type: Schema.Types.ObjectId,
        ref: 'Comentario',
        type: String,
    }],

}, {
    timestamps: true,
});


ProductoSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...producto } = this.toObject();
    producto.uid = _id;
    return producto;
}


module.exports = model('Producto', ProductoSchema);