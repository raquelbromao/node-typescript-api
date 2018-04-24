"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let VENDEDOR = new mongoose_1.Schema({
    VDD_ID: {
        type: Number
    },
    VDD_NOME: {
        type: String
    },
    VDD_SENHA_PALM: {
        type: String
    },
    VDD_PERC_DESC_MAX: {
        type: Number
    },
    VDD_MAX_PEDIDOS: {
        type: Number
    },
    EMP_NOME: {
        type: String
    },
    EMP_TELEFONE: {
        type: String
    },
    VDD_BLOQ_PEDIDO_XDIAS: {
        //BloqueiarPedidoXdias ##CASOS:
        /**
         * "case when PAR_EXP_REC_PDA = ''S'' or PAR_PALM_BLOQ_RESTRITOS = ''S''
         * then isnull(PAR_DIASDECARENCIA,0)
         * else 0 end"
         */
        type: Number
    },
    PAR_PALM_BLOQ_SEM_ESTOQUE: {
        type: String
    },
    PAR_PALM_FABRICANTE: {
        type: String
    },
    PAR_PALM_CAMPOS_OBRIG: {
        type: String
    },
    PAR_PALM_MULTIPLO: {
        type: String
    },
    PAR_PALM_CONTROLE_SALDO_CLI: {
        type: String
    },
    PAR_PALM_BLOQ_CLI_PF: {
        type: String
    },
    PAR_PALM_BLOQ_PEDIDO_PF: {
        type: String
    }
});
exports.default = mongoose_1.model('VENDEDOR', VENDEDOR);
