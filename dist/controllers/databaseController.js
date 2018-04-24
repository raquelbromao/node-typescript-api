"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlDatabase_1 = require("../config/sqlDatabase");
class DatabaseController {
    constructor() { }
    receiveFromMSSQLandInsertMONGO(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let camposCliente = "CODIGOCLIENTE, FANTASIA, RAZAOSOCIAL, ENDERECO, BAIRRO, CODIGOCIDADE, CEP, FAX, EMAIL, PESSOAFJ, CNPJCPF, INSCRICAOESTADUAL, INSCRICAOMUNICIPAL, CONTATO1, CONTATO2, TELEFONE1, TELEFONE2, ANIVERSARIO1, ANIVERSARIO2, VIP, LIMITECREDITO, TOTALTITULOSVENCIDOS, TOTALTITULOSAVENCER, SALDO, ENDERECOENTREGA, BAIRROENTREGA, CODIGOCIDADEENTREGA, CEPENTREGA, ENDERECOCOBRANCA, BAIRROCOBRANCA, CODIGOCIDADECOBRANCA, CEPCOBRANCA, CODIGOCATEGORIA, CODIGOATIVIDADE, CAIXAPOSTAL, HOMEPAGE, CODIGOTABELA, CODIGOCONDICAOPAGTO, CODIGOFORMAPAGTO, NUMERO";
            let camposProduto = "PRO_ID, DEP_ID, PRO_EAN1, PRO_DESCRICAO, PRO_OBSERVACOES, PRO_UNIDADE, PRO_DATACADASTRO, PRO_QUANT_UNID, PRO_ESTOQUE, PRO_VLRVENDA, PRO_VLRMINIMO, PRO_IMP_CATALOGO, PRO_TROCA, PRO_NOVO = (CASE WHEN DATEDIFF(dd,PRO_DATACADASTRO,GETDATE()) <= 7 THEN 'S' ELSE 'N' END), PRO_FALTA = (CASE WHEN PRO_ESTOQUE <= 0 THEN 'S' ELSE 'N' END), PRO_MAX_DESC = (SELECT PAR_PRO_MAX_DESC FROM PARAMS), MRC_ID";
            let camposVendedor = "VDD_ID, VDD_NOME, VDD_SENHA_PALM, VDD_PERC_DESC_MAX, VDD_MAX_PEDIDOS, VDD_BLOQ_PEDIDO_XDIAS = (SELECT DIAS = (case when PAR_EXP_REC_PDA = 'S' or PAR_PALM_BLOQ_RESTRITOS = 'S' then isnull(PAR_DIASDECARENCIA,0) else 0 end) FROM PARAMS), EMP_NOME = (SELECT EMP_NOME FROM EMPRESAS), EMP_TELEFONE = (SELECT EMP_TELEFONE FROM EMPRESAS), PAR_PALM_BLOQ_SEM_ESTOQUE = (SELECT PAR_PALM_BLOQ_SEM_ESTOQUE FROM PARAMS), PAR_PALM_FABRICANTE = (SELECT PAR_PALM_FABRICANTE FROM PARAMS), PAR_PALM_CAMPOS_OBRIG = (SELECT PAR_PALM_CAMPOS_OBRIG FROM PARAMS), PAR_PALM_MULTIPLO = (SELECT PAR_PALM_MULTIPLO FROM PARAMS), PAR_PALM_CONTROLE_SALDO_CLI = (SELECT PAR_PALM_CONTROLE_SALDO_CLI FROM PARAMS), PAR_PALM_BLOQ_CLI_PF = (SELECT PAR_PALM_BLOQ_CLI_PF FROM PARAMS), PAR_PALM_BLOQ_PEDIDO_PF = (SELECT PAR_PALM_BLOQ_PEDIDO_PF FROM PARAMS)";
            let camposDepartamentos = 'DEP_ID, DEP_DESCRICAO';
            var mssql = new sqlDatabase_1.default();
            //  Recebe dados da tabela CLIENTES/PRODUTO (MSSQL) e insere na coleção CLIENTES/PRODUTO (MongoDB)
            //await mssql.getTableAndInsert('PRODUTO', camposProduto, res);
            //await mssql.getTableAndInsert('VENDEDOR', camposVendedor, res);
            yield mssql.getTableAndInsert('VW_CLIENTE_PALM', camposCliente, res);
        });
    }
}
const databaseController = new DatabaseController();
exports.default = databaseController;
