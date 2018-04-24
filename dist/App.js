"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const auth_1 = require("./auth");
const Database_1 = require("./config/Database");
const Routes_1 = require("./routes/Routes");
const authRoutes_1 = require("./routes/authRoutes");
const databaseRoutes_1 = require("./routes/databaseRoutes");
//  CLASSE QUE GERA O APP
class App {
    //  Constrói os módulos usados pelo app
    constructor() {
        //  Cria a aplicação
        this.api = express();
        //  Cria o middleware
        this.middleware();
        //  Habilita as configurações do cors
        this.enableCors();
        //  Cria as rotas
        this.routes();
        //  Cria o BD MONGO
        this.db();
        // Cria o BD SQL
        //this.dbSQL();
    }
    middleware() {
        this.api.use(morgan('dev'));
        this.api.use(bodyParser.json());
        this.api.use(bodyParser.urlencoded({ extended: false }));
        this.api.use(auth_1.default.initialize());
    }
    enableCors() {
        const options = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false
        };
        this.api.use(cors(options));
    }
    db() {
        this.mongoDatabase = new Database_1.default();
        this.databaseConnection();
    }
    //  Cria conexão com o banco de dados
    databaseConnection() {
        this.mongoDatabase.createConnection();
    }
    //  Fecha a conexão com a base de dados
    closeDatabaseConnection(message, callback) {
        this.mongoDatabase.closeConnection(message, () => callback());
    }
    routes() {
        let router;
        router = express.Router();
        //var set1 = require('./routes/Routes')(this.dbMMSQL);
        this.api.use('/', router);
        this.api.use('/api/v1/usuarios', auth_1.default.authenticate(), Routes_1.default);
        this.api.use('/api/v1/auth', authRoutes_1.default);
        this.api.use('/api/v1/sincronizacaoInicial', databaseRoutes_1.default);
    }
}
exports.default = new App().api;
