"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let PRODUTO = new mongoose_1.Schema({
    PRO_ID: {
        type: Number
    },
    PRO_EAN1: {
        type: String
    },
    PRO_DESCRICAO: {
        type: String
    },
    PRO_OBSERVACOES: {
        type: String
    },
    PRO_TROCA: {
        type: String
    },
    PRO_EMBUNIDADE: {
        type: String
    },
    PRO_ESTOQUE: {
        type: Number
    },
    PRO_VLRVENDA: {
        type: Number
    },
    PRO_VLRMINIMO: {
        type: Number
    },
    PRO_VLRMAXIMO: {
        type: Number
    },
    PRO_IMP_CATALOGO: {
        type: String
    },
    PRO_PRECO_FIXO: {
        type: String
    }
});
exports.default = mongoose_1.model('PRODUTO', PRODUTO);
