"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let produtoSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('Produto', produtoSchema);
