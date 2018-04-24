"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let GRUPOS = new mongoose_1.Schema({
    GRP_ID: {
        type: Number
    },
    GRP_DESCRICAO: {
        type: String
    }
});
//let camposGrupos = 'GRP_ID, GRP_DESCRICAO';
exports.default = mongoose_1.model('GRUPOS', GRUPOS);
