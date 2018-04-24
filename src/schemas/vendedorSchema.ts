import { Schema, model } from 'mongoose';

let VENDEDOR: Schema = new Schema({
    VDD_ID: { //CodigoVendedor
        type: Number
    },
    VDD_NOME: { //Nome
        type: String
    },
    VDD_SENHA_PALM: { //Senha
        type: String
    },
    VDD_PERC_DESC_MAX: { //DescontoMaximoPercentual
        type: Number
    },
    VDD_MAX_PEDIDOS: { //NumeroMaximoPedidos
        type: Number
    },
    EMP_NOME: { //NomeEmpresa ##RELACIONAMENTO EMPRESAS -> EMP_NOME
        type: String
    },
    EMP_TELEFONE: { //TelefoneEmpresa ##RELACIONAMENTO EMPRESAS -> EMP_TELEFONE
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
    PAR_PALM_BLOQ_SEM_ESTOQUE: { //BloquearProdutoSemEstoque - CHAR
        type: String
    }, 
    PAR_PALM_FABRICANTE: { //UsaFabricanteProduto - CHAR
        type: String
    }, 
    PAR_PALM_CAMPOS_OBRIG: { //AtivaPreenchimentoObrigatorioCliente - CHAR
        type: String
    }, 
    PAR_PALM_MULTIPLO: { //UsaMultiplo - CHAR
        type: String
    }, 
    PAR_PALM_CONTROLE_SALDO_CLI: { //UsaControleSaldoCliente - CHAR
        type: String
    }, 
    PAR_PALM_BLOQ_CLI_PF: { //BloquearInclusaoClientePessoaFisica - CHAR
        type: String
    }, 
    PAR_PALM_BLOQ_PEDIDO_PF: { //BloquearInclusaoPedidoPessoaFisica - CHAR
        type: String
    }
});

export default model('VENDEDOR', VENDEDOR);