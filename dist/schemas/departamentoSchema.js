"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let DEPARTAMENTO = new mongoose_1.Schema({
    DEP_ID: {
        type: Number
    },
    DEP_DESCRICAO: {
        type: String
    }
});
//let camposDepartamentos = 'DEP_ID, DEP_DESCRICAO';
exports.default = mongoose_1.model('DEPARTAMENTO', DEPARTAMENTO);
