const { Schema, model } = require('mongoose');

const PostSchema = Schema({
    creado: {
        type: Date,
    },
    mensaje: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es requerido']
    },
    tienda: {
        type: Schema.Types.ObjectId,
        ref: 'Tienda',

    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
    },
    imagenes: [{
        type: String,

    }],
    coordenadas: {
        type: String
    },
    posicion: {
        type: String
    },
    megusta: {
        type: Number,
        default: 0,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    comentario: [{
        type: String,
    }]


}, {
    timestamps: true,
});

PostSchema.pre('save', function(next) {
    this.creado = new Date();
    next();
});
PostSchema.methods.toJSON = function() {
    const { __v, _id, ...post } = this.toObject();
    post.uid = _id;
    return post;
}


module.exports = model('Post', PostSchema);