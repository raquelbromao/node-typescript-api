"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let MUNICIPIOS = new mongoose_1.Schema({
    MUN_COD: {
        type: Number
    },
    MUN_NOME: {
        type: String
    },
    MUN_UF: {
        type: String
    }
});
//let camposMunicipios = 'MUN_COD, MUN_NOME, MUN_UF';
exports.default = mongoose_1.model('MUNICIPIOS', MUNICIPIOS);
