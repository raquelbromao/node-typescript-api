"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let PRODUTO = new mongoose_1.Schema({
    PRO_REFERENCIA: {
        type: String
    },
    DEP_ID: {
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
    PRO_UNIDADE: {
        type: String
    },
    PRO_ESTOQUE: {
        type: Number
    },
    PRO_QUANT_UNID: {
        type: Number
    },
    PRO_PRECO_PADRAO: {
        //PrecoPadrao ##CASOS:
        /*
        * "case  when PRO_PROMOCAO = 'S' then PRO_PROMOCAO_VLR
        * when PRO_PRECO_FIXO = 'S' then PRO_VLRVENDA
        * else PRO_VLRVENDA + round(PRO_VLRVENDA * ISNULL(REG_PERCENTUAL,0) / 100, 3) end"
        *
        */
        type: Number
    },
    PRO_VLRMINIMO: {
        type: Number
    },
    PRO_MAX_DESC: {
        type: Number
    },
    PRO_DESCMAX: {
        type: Number
    },
    PRO_IMP_CATALOGO: {
        type: String
    },
    PRO_TROCA: {
        type: String
    },
    PRO_FALTA: {
        //ProdutoEmFalta ##CASOS:
        /*
        * case when PRO_ESTOQUE <= 0 then 'S' else 'N' end
        */
        type: String
    },
    PRO_NOVO: {
        //ProdutoNovo ##CASOS:
        /*
        * case when DATEDIFF(dd, PRO_DATACADASTRO, GETDATE()) <= 7 then 'S'
        * else 'N' end
        */
        type: String
    },
    PRO_PROMO: {
        //ProdutoEmPromocao ##CASOS:
        /**
         *
         */
        type: String
    },
    MRC_ID: {
        type: Number,
    }
});
//let camposProduto = 'PRO_REFERENCIA, DEP_ID, PRO_EAN1, PRO_DESCRICAO, PRO_OBSERVACOES, PRO_DATACADASTRO, PRO_UNIDADE, PRO_PROMOCAO_VLR, PRO_QUANT_UNID, PRO_ESTOQUE, PRO_VLRVENDA, PRO_VLRMINIMO, PRO_IMP_CATALOGO, PRO_TROCA, pro_descmax, MRC_ID';
exports.default = mongoose_1.model('PRODUTO', PRODUTO);
