"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
    },
    login: {
        type: String
    },
    senha: {
        type: String
    }
});
exports.default = usuarioSchema;
