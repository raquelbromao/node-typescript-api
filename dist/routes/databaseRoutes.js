"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const databaseController_1 = require("../controllers/databaseController");
class DatabaseRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * Função que cria e define as rotas e suas respectivas funções no UserController
     */
    routes() {
        this.router.get("/receberTabelasSQL", databaseController_1.default.receiveFromMSSQLandInsertMONGO.bind(databaseController_1.default));
    }
}
//  Exportação
const databaseRoutes = new DatabaseRouter();
databaseRoutes.routes();
exports.default = databaseRoutes.router;
