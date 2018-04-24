import { Schema, model } from 'mongoose';

let DEPARTAMENTO: Schema = new Schema({
    DEP_ID: { // CodigoGrupo
        type: Number
    }, 
    DEP_DESCRICAO: { // DescricaoGrupo
        type: String
    }
});

//let camposDepartamentos = 'DEP_ID, DEP_DESCRICAO';
export default model('DEPARTAMENTO', DEPARTAMENTO);