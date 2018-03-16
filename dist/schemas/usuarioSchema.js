"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let usuarioSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('User', usuarioSchema);
