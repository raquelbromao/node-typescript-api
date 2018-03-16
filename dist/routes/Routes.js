"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
class UsuarioRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * Função que cria e define as rotas e suas respectivas funções no UserController
     */
    routes() {
        this.router.get('/', usuarioController_1.default.listUsuarios); // Rota para listar todos os usuários inseridos no BD
        this.router.post('/', usuarioController_1.default.createUsuario); //  Rota para criar usuário e inserir no BD
        this.router.put('/:login', usuarioController_1.default.updateUsuario); //  Rota para atualizar dados do usuário no BD
        this.router.delete('/:login', usuarioController_1.default.deleteUsuario); //  Rota para deletar usuário do BD
        this.router.get('/login/:login&:senha', usuarioController_1.default.validateToken); //  Valida token do usuário no login
    }
}
//  Exportação
const usuarioRoutes = new UsuarioRouter();
usuarioRoutes.routes();
exports.default = usuarioRoutes.router;