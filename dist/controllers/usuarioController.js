"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const usuarioSchema_1 = require("../schemas/usuarioSchema");
const produtoSchema_1 = require("../schemas/produtoSchema");
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
     * @param req parâmetros do usuário
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
    validateToken(req, res) {
        const login_aux = req.body.email;
        const senha_aux = req.body.senha;
        let isValid = false;
        usuarioSchema_1.default
            .findOne({ login: login_aux }, "senha")
            .then(res => {
            //console.log(res.get('senha'));
            let senha = res.get("senha");
            isValid = bcrypt.compareSync(senha_aux, senha);
            console.log("A senha informada é válida? -> " + isValid);
        })
            .catch(err => {
            const status = res.statusCode;
            console.log("Status: " + status + "\nErro: " + err);
            res.status(404).send(err);
        });
        console.log(req.params.login);
        console.log(req.params.senha);
        console.log(req.params);
        res.status(200).json({ mensagem: "login liberado" });
    }
    /*public receberDados2(req: Request, res: Response) {
      var dadosJson = req.body;
  
      for (const dado in dadosJson) {
        let usuario = dadosJson[dado];
        let nome = usuario.nome;
        let login = usuario.login;
  
        //  Faz a criptografia da senha para ser salva no BD
        let senha_descriptografada = usuario.senha;
        let senha_criptografada = bcrypt.hashSync(senha_descriptografada, 10);
        let eValido: boolean = bcrypt.compareSync(
          senha_descriptografada,
          senha_criptografada
        );
        eValido
          ? console.log("criptografia bateu, liberado acesso")
          : console.log("criptografia não bateu, não está liberado acesso");
        let senha = senha_criptografada;
  
        const usuarioNovo = new usuarioSchema({
          nome,
          login,
          senha
        });
  
        usuarioNovo
          .save()
          .then(data => {
            console.log("Novo usuário cadastrado com sucesso! -> " + data);
          })
          .catch(err => {
            console.log("Erro ao salvar usuario no BD -> " + err);
          });
      }
  
      res
        .status(200)
        .json({
          mensagem:
            "todos os objetos do JSON enviados foram cadastrados, conferir BD!"
        });
    }*/
    receberDados(req, res) {
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
        let produtosJson = req.body.produtos;
        for (const item in produtosJson) {
            console.log(produtosJson[item]);
            let produto = produtosJson[item];
            console.log(produto);
            let produtoNovo = new produtoSchema_1.default(produto);
            produtoNovo
                .save()
                .then(data => {
                console.log("Novo produto cadastrado com sucesso! -> " + data);
            })
                .catch(err => {
                console.log("Erro ao salvar produtoo no BD -> " + err);
            });
            console.log("---------------------------");
        }
        res.status(200).json({ mensagem: "200.OK" });
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
