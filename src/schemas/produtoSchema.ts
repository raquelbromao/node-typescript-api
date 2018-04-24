import { Schema, model } from 'mongoose';

let PRODUTO: Schema = new Schema({
    PRO_REFERENCIA: { //CodigoProduto
        type: String
    },
    DEP_ID: { //CodigoGrupo
        type: Number
    },
    PRO_EAN1: { //CodigoBarras
        type: String
    },
    PRO_DESCRICAO: { //DescricaoProduto    
        type: String
    },
    PRO_OBSERVACOES: { //Obs     
        type: String
    },
    PRO_UNIDADE: { //Embalagem
        type: String
    },
    PRO_ESTOQUE: { //Estoque
        type: Number
    },
    PRO_QUANT_UNID: { //Multiplo (multiplo de PRO_QUANT)
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
    PRO_VLRMINIMO: { //MinimoVenda
        type: Number
    },
    PRO_MAX_DESC: { //DescontoMaximoPercentual ##RELACIONAMENTO PARAMS -> PAR_PRO_MAX_DESC
        type: Number
    },
    PRO_DESCMAX: {
        type: Number
    },
    PRO_IMP_CATALOGO: { //Catalogo    
        type: String
    },
    PRO_TROCA: { //PermiteTroca
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
    MRC_ID: { //CodigoFabricante
        type: Number,
    }
});

//let camposProduto = 'PRO_REFERENCIA, DEP_ID, PRO_EAN1, PRO_DESCRICAO, PRO_OBSERVACOES, PRO_DATACADASTRO, PRO_UNIDADE, PRO_PROMOCAO_VLR, PRO_QUANT_UNID, PRO_ESTOQUE, PRO_VLRVENDA, PRO_VLRMINIMO, PRO_IMP_CATALOGO, PRO_TROCA, pro_descmax, MRC_ID';
export default model('PRODUTO', PRODUTO);