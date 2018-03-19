"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const usuarioSchema_1 = require("../schemas/usuarioSchema");
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
    //public validateLogin(req: Request, res: Response): {
    //}
    validateToken(req, res) {
        const login_aux = req.params.login;
        const senha_aux = req.params.senha;
        let isValid = false;
        usuarioSchema_1.default.findOne({ 'login': login_aux }, 'senha', ((err, res) => {
            console.log(res.get('senha'));
            let senha = res.get('senha');
            isValid = bcrypt.compareSync(senha_aux, senha);
            console.log(isValid);
        }));
        return isValid;
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
