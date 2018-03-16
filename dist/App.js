"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
//import * as debug from 'debug';
const Database_1 = require("./config/Database");
//import * as usuarioRepositorio from "./repositories/usuarioRepositorio";
const Routes_1 = require("./routes/Routes");
//  CLASSE QUE GERA O APP
class App {
    //  Constrói os módulos usados pelo app
    constructor() {
        //  Cria a aplicação
        this.api = express();
        //  Cria o middleware
        this.middleware();
        //  Cria as rotas
        this.routes();
        //  Cria o BD
        this.db();
        //this.mountRoutes();
        //  Habilita o cors
        //this.enableCors();
    }
    middleware() {
        this.api.use(bodyParser.json());
        this.api.use(bodyParser.urlencoded({ extended: false }));
        //this.api.use(debug);
    }
    routes() {
        let router;
        router = express.Router();
        this.api.use('/', router);
        this.api.use('/api/v1/usuarios', Routes_1.default);
    }
    db() {
        this.database = new Database_1.default();
        this.databaseConnection();
    }
    //  Habilita cors
    /*enableCors() {
        const configureOption: cors.CorsOptions =  {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"];
            methods: ['GET', 'POST','PUT','DELETE']
        }
    }*/
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
