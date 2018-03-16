import { Schema, model } from 'mongoose';

let usuarioSchema: Schema = new Schema({
    nome: {
        type: String,
    },
    login: {
        type: String,
        unique: true
    },
    senha: {
        type: String
    }
});

export default model('User', usuarioSchema);