import { Schema, model } from 'mongoose';

let MUNICIPIOS: Schema = new Schema({
    MUN_COD: { // CodigoCidade
        type: Number
    },
    MUN_NOME: { // DescricaoCidade
        type: String
    }, 
    MUN_UF: { // UF
        type: String
    }
});

//let camposMunicipios = 'MUN_COD, MUN_NOME, MUN_UF';
export default model('MUNICIPIOS', MUNICIPIOS);