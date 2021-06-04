const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, 'El usuario es obligatorio'],
    },
    token: {
        type: String,
        required: true,
    },
    codigo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 900,
    },
});

module.exports = mongoose.model("Token", tokenSchema);