"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class AuthRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
    * Função que cria e define as rotas e suas respectivas funções no UserController
    */
    routes() {
        this.router.post('/', authController_1.default.auth);
    }
}
//  Exportação
const authRoutes = new AuthRouter();
authRoutes.routes();
exports.default = authRoutes.router;
