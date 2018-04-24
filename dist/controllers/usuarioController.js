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
const bcrypt = require("bcrypt");
const sqlDatabase_1 = require("../config/sqlDatabase");
const usuarioSchema_1 = require("../schemas/usuarioSchema");
const produtoSchema_1 = require("../schemas/produtoSchema");
const vendedorSchema_1 = require("../schemas/vendedorSchema");
const clienteSchema_1 = require("../schemas/clienteSchema");
class UsuarioController {
    constructor() { }
    /**
     * Função que lista todos os usuários cadastrados no BD
     * @param req
     * @param res
     */
    listUsuarios(req, res) {
        usuarioSchema_1.default
            .find({})
            .then(data => {
            const status = res.statusCode;
            res.json({ status, data });
        })
            .catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    /**
     * Função que realiza o cadastro de um novo usuário no BD
     * @param req
     * @param res
     */
    createUsuario(req, res) {
        const nome = req.body.nome;
        const login = req.body.login;
        let senha_cript = req.body.senha;
        //  Faz a criptografia da senha para ser salva no BD
        let senha = bcrypt.hashSync(senha_cript, 10);
        let senha_descrip = bcrypt.compareSync(senha_cript, senha);
        //  Cria objeto do tipo Usuário
        const usuario = new usuarioSchema_1.default({
            nome,
            login,
            senha
        });
        //  Insere objeto Usuário no BD
        usuario
            .save()
            .then(data => {
            const status = res.statusCode;
            res.json({ status, data });
            console.log("Novo usuário cadastrado com sucesso!\nnome: " +
                nome +
                "\nlogin: " +
                login +
                "\nsenha: " +
                senha +
                "\nBcrypt: " +
                senha_cript +
                "\nDescriptografia: " +
                senha_descrip);
        })
            .catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    /**
     * Função que atualiza os dados do usuário cadastrado no BD
     * @param req
     * @param res
     */
    updateUsuario(req, res) {
        const login = req.params.login;
        usuarioSchema_1.default
            .findOneAndUpdate({ login }, req.body)
            .then(data => {
            res.status(200).json({ data });
            console.log("Usuário de login " + login + " teve dados alterados!");
        })
            .catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    /**
     * Função que deleta o usuário do BD
     * @param req
     * @param res
     */
    deleteUsuario(req, res) {
        const login = req.params.login;
        usuarioSchema_1.default
            .findOneAndRemove({ login }, req.body)
            .then(data => {
            const status = res.statusCode;
            res.json({ status, data });
            console.log("Usuário de login " + login + " foi deletado!");
        })
            .catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    /**
     * Função que valida o login
     *
     * @param req
     * @param res
     */
    validateToken(req, res) {
        const login_aux = req.body.email;
        const senha_aux = req.body.senha;
        let eValida = false;
        usuarioSchema_1.default
            .findOne({ login: login_aux }, "senha")
            .then(res => {
            //console.log(res.get('senha'));
            let senha = res.get("senha");
            eValida = bcrypt.compareSync(senha_aux, senha);
            console.log("A senha informada é válida? -> " + eValida);
        })
            .catch(err => {
            const status = res.statusCode;
            console.log("Status: " + status + "\nErro: " + err);
            res.status(404).send(err);
        });
        //console.log(req.params.login);
        //console.log(req.params.senha);
        //console.log(req.params);
        (eValida) ? res.status(200).json({ mensagem: "login liberado" }) :
            res.status(404).json({ mensagem: "ERRO" });
    }
    testToken(req, res) {
        res.status(200).json({ mensagem: "Acesso Autorizado" });
    }
    testarRecuperacaoDeUsuario(req, res) {
        // Recebe a ID do usuário e faz a procura
        var usuario_senha = null;
        usuarioSchema_1.default.findById(req.params.id)
            .then(usuario => {
            if (usuario) {
                usuario_senha = usuario.get("senha");
                console.log(usuario.get("senha"));
                console.log(usuario.get("nome"));
            }
            else {
                res.sendStatus(401);
            }
        })
            .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
        //console.log(usuario_senha);
        res.sendStatus(200);
    }
    /**
     * Função para receber os dados do SQLServer
     *
     * @param req
     * @param res
     */
    receberDadosSQL(req, res) {
        //  Faz análise dos usuários contidos no json
        let usuariosJson = req.body.usuarios;
        for (const item in usuariosJson) {
            // FAZ A CRIPTOGRAFIA DA SENHA
            let senha_descriptografada = usuariosJson[item].senha;
            let senha_criptografada = bcrypt.hashSync(senha_descriptografada, 10);
            console.log(senha_criptografada);
            usuariosJson[item].senha = senha_criptografada;
            const usuarioNovo = new usuarioSchema_1.default(usuariosJson[item]);
            usuarioNovo
                .save()
                .then(data => {
                console.log('Novo usuário cadastrado com sucesso! -> ' + data);
            })
                .catch(err => {
                console.log('Erro ao salvar usuario no BD -> ' + err);
            });
        }
        console.log("---------------------------");
        //  Faz análise dos produtos contidos no json
        /* let produtosJson = req.body.produtos;
           for (const item in produtosJson) {
             console.log(produtosJson[item]);
             let produto = produtosJson[item];
             console.log(produto);
     
             let produtoNovo = new produtoSchema(produto);
     
             produtoNovo
               .save()
               .then(data => {
                 console.log("Novo produto cadastrado com sucesso! -> " + data);
               })
               .catch(err => {
                 console.log("Erro ao salvar produtoo no BD -> " + err);
               });
     
             console.log("---------------------------");
           }*/
        res.sendStatus(200);
    }
    /**
     * Função que envia os dados do BD para o APP, quando este último requisitar
     * Enviado em formato JSON
     *
     * @param req
     * @param res
     */
    testeQuerys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //let camposVendedor = 'VDD_ID, VDD_NOME, VDD_SENHA_PALM, VDD_PERC_DESC_MAX, VDD_MAX_PEDIDOS';
            //let camposEmpresa = 'EMP_NOME, EMP_TELEFONE';
            //let camposParams = 'PAR_PALM_BLOQ_SEM_ESTOQUE, PAR_PALM_FABRICANTE, PAR_PALM_CAMPOS_OBRIG, PAR_PALM_MULTIPLO, PAR_PALM_CONTROLE_SALDO_CLI, PAR_PALM_BLOQ_CLI_PF, PAR_PALM_BLOQ_PEDIDO_PF';
            //var query = 'SELECT ' + camposEmpresa + ' FROM EMPRESAS';
            //var query = 'SELECT ' + camposVendedor + ' FROM VENDEDOR';
            //var query = 'SELECT ' + camposParams + ' FROM PARAMS';
            var query = "SELECT PRO_NOVO = (CASE WHEN DATEDIFF(dd,PRO_DATACADASTRO,GETDATE()) <= 7 THEN 'S' ELSE 'N' END) FROM PRODUTO";
            var query2 = "SELECT PRO_ESTOQUE, PRO_FALTA = (CASE WHEN PRO_ESTOQUE <= 0 THEN 'S' ELSE 'N' END) FROM PRODUTO";
            var query3 = "SELECT V.PRO_PROMOCAO FROM VW_PRODUTO_EXPORT V WHERE PRODUTO.PRO_ID = VW_PRODUTO_EXPORT.PRO_ID";
            var query4 = "SELECT PRO_PROMOCAO = (SELECT v.PRO_PROMOCAO FROM VW_PRODUTO_EXPORT v INNER JOIN PRODUTO t ON t.PRO_ID = v.PRO_ID) FROM PRODUTO";
            var query5 = "SELECT VDD_BLOQ_PEDIDO_XDIAS = (SELECT DIAS = (case when PAR_EXP_REC_PDA = 'S' or PAR_PALM_BLOQ_RESTRITOS = 'S' then isnull(PAR_DIASDECARENCIA,0) else 0 end) FROM PARAMS) FROM VENDEDOR";
            var query6 = "SELECT CODIGOCLIENTE, FANTASIA, RAZAOSOCIAL, ENDERECO, BAIRRO, CODIGOCIDADE, CEP, FAX, EMAIL, PESSOAFJ, CNPJCPF, INSCRICAOESTADUAL, INSCRICAOMUNICIPAL, CONTATO1, CONTATO2, TIMEHOBBY1, TIMEHOBBY2, TELEFONE1, TELEFONE2, ANIVERSARIO1, ANIVERSARIO2, VIP, LIMITECREDITO, TOTALTITULOSVENCIDOS, TOTALTITULOSAVENCER, SALDO, ENDERECOENTREGA, BAIRROENTREGA, CODIGOCIDADEENTREGA, CEPENTREGA, ENDERECOCOBRANCA, BAIRROCOBRANCA, CODIGOCIDADECOBRANCA, CEPCOBRANCA, CODIGOCATEGORIA, CODIGOATIVIDADE, CAIXAPOSTAL, HOMEPAGE, CODIGOTABELA, CODIGOCONDICAOPAGTO, CODIGOFORMAPAGTO, NUMERO, CAST('' AS VARCHAR), CAST('' AS VARCHAR) FROM VW_CLIENTE_PALM";
            var db = new sqlDatabase_1.default();
            db.appQuery(res, query6);
        });
    }
    /**
     *
     * @param req
     * @param res
     */
    sincronizacaoInicial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield produtoSchema_1.default
                .find({})
                .then(produtos => {
                vendedorSchema_1.default
                    .find({})
                    .then(vendedores => {
                    clienteSchema_1.default
                        .find({})
                        .then(clientes => {
                        res.status(200).json({ produtos, vendedores, clientes });
                    })
                        .catch(err => {
                        res.status(404).json({ err });
                    });
                })
                    .catch(err => {
                    res.status(404).json({ err });
                });
            })
                .catch(err => {
                res.status(404).json({ err });
            });
        });
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
