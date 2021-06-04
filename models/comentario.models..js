const { Schema, model } = require('mongoose');

const ComentarioSchema = Schema({
    creado: {
        type: Date,
    },
    mensaje: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    tienda: {
        type: Schema.Types.ObjectId,
        ref: 'Tienda',
    },
    megusta: {
        type: Number,
        default: 0,
    },

    estado: {
        type: Boolean,
        default: true,
    },

}, {
    timestamps: true,
});

ComentarioSchema.pre('save', function(next) {
    this.creado = new Date();
    next();
});
ComentarioSchema.methods.toJSON = function() {
    const { __v, _id, ...comentario } = this.toObject();
    comentario.uid = _id;
    return comentario;
}


module.exports = model('Comentario', ComentarioSchema);