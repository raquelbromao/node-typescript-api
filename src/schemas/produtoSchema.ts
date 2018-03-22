import { Schema, model } from 'mongoose';

let produtoSchema: Schema = new Schema({
    nome: {
        type: String,
    },
    codigo: {
        type: String,
        unique: true
    },
    estoque: {
        type: Number,
    },
    tags: {
        tag1: { type: String },
        tag2: { type: String },
        tag3: { type: String }
    }

});

export default model('Produto', produtoSchema);