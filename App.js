"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const Database_1 = require("./config/Database");
const Route = require("./routes/Routes");
//  CLASSE QUE GERA O APP
class App {
    //  Constrói os módulos usados pelo app
    constructor() {
        //  Cria a aplicação
        this.api = express();
        //  Cria o middleware
        this.middleware();
        //  Configura as rotas
        this.routes();
        //this.mountRoutes();
        //  Cria e conecta com o baco de dados
        this.database = new Database_1.default();
    }
    //  Configura o middleware
    middleware() {
        this.api.use(bodyParser.json());
        this.api.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        //  Pega as rotas
        let router;
        router = express.Router();
        //  Cria as rotas
        var usuario = new Route.Usuario();
        //home page
        router.get("/", usuario.index.bind(usuario.index));
        //use router middleware
        this.api.use(router);
    }
    //  Cria conexão com o banco de dados
    databaseConnection() {
        this.database.createConnection();
    }
    //  Fecha a conexão com a base de dados
    closeDatabaseConnection(message, callback) {
        this.database.closeConnection(message, () => callback());
    }
}
exports.default = new App().api;
