const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El role es requerido'],
        unique: true
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


CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...categoria } = this.toObject();
    categoria.uid = _id;
    return categoria;
}


module.exports = model('Categoria', CategoriaSchema);