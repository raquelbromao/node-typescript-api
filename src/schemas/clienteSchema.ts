import { Schema, model } from 'mongoose';

let CLIENTES: Schema = new Schema({
    CODIGOCLIENTE: {
        type: Number
    },
    FANTASIA: {
        type: String
    }, 
    RAZAOSOCIAL: {
        type: String
    }, 
    ENDERECO: {
        type: String
    }, 
    BAIRRO: {
        type: String
    }, 
    CODIGOCIDADE: {
        type: String
    }, 
    CEP: {
        type: String
    }, 
    FAX: {
        type: String
    }, 
    EMAIL: {
        type: String
    }, 
    PESSOAFJ: {
        type: String
    }, 
    CNPJCPF: {
        type: Number
    }, 
    INSCRICAOESTADUAL: {
        type: String
    }, 
    INSCRICAOMUNICIPAL: {
        type: String
    }, 
    CONTATO1: {
        type: String
    }, 
    CONTATO2: {
        type: String
    },  
    TELEFONE1: {
        type: String
    }, 
    TELEFONE2: {
        type: String
    }, 
    ANIVERSARIO1: {
        type: String
    }, 
    ANIVERSARIO2: {
        type: String
    }, 
    VIP: {
        type: String
    }, 
    LIMITECREDITO: {
        type: Number
    }, 
    TOTALTITULOSVENCIDOS: {
        type: Number
    }, 
    TOTALTITULOSAVENCER: {
        type: Number
    }, 
    SALDO: {
        type: Number
    }, 
    ENDERECOENTREGA: {
        type: String
    }, 
    BAIRROENTREGA: {
        type: String
    }, 
    CODIGOCIDADEENTREGA: {
        type: String
    }, 
    CEPENTREGA: {
        type: String
    }, 
    ENDERECOCOBRANCA: {
        type: String
    }, 
    BAIRROCOBRANCA: {
        type: String
    }, 
    CODIGOCIDADECOBRANCA: {
        type: String
    }, 
    CEPCOBRANCA: {
        type: String
    }, 
    CODIGOCATEGORIA: {
        type: String
    }, 
    CODIGOATIVIDADE: {
        type: String
    }, 
    CAIXAPOSTAL: {
        type: String
    }, 
    HOMEPAGE: {
        type: String
    }, 
    CODIGOTABELA: {
        type: String
    }, 
    CODIGOCONDICAOPAGTO: {
        type: String
    }, 
    CODIGOFORMAPAGTO: {
        type: String
    }, 
    NUMERO: {
        type: String
    }   
});

export default model('CLIENTES', CLIENTES);