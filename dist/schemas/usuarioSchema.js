"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let usuarioSchema = new mongoose_1.Schema({
    CLI_ID: {
        type: String
    },
    CLI_NOME: {
        type: String
    },
    CLI_NOMEFANTASIA: {
        type: String
    },
    CLI_INSCRICAO: {
        type: String
    },
    CLI_INSCRICAO_MUN: {
        type: String
    },
    CLI_CPF: {
        type: String
    },
    CLI_ENDERECO: {
        type: String
    },
    CLI_BAIRRO: {
        type: String
    },
    CLI_CEP: {
        type: String
    },
    CLI_CIDADE: {
        type: String
    },
    CLI_ESTADO: {
        type: String
    },
    CLI_CONTATO: {
        type: String
    },
    CLI_CELULARFAX: {
        type: String
    },
    CLI_TELEFONE: {
        type: String
    },
    CLI_TELEFONE1: {
        type: String
    },
    CLI_TELEFONE2: {
        type: String
    },
    CLI_EMAIL: {
        type: String
    },
    CLI_ENDERECOCOBRANCA: {
        type: String
    },
    CLI_BAIRROCOBRANCA: {
        type: String
    },
    CLI_CEPCOBRANCA: {
        type: String
    },
    CLI_CIDADECOBRANCA: {
        type: String
    },
    CLI_ESTADOCOBRANCA: {
        type: String
    },
    CLI_CREDITO: {
        type: Number,
    }
});
exports.default = mongoose_1.model('User', usuarioSchema);
