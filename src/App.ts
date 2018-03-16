import * as express from 'express'
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
//import * as debug from 'debug';
import Database from "./config/Database";
import * as Route from "./routes/Routes";
//import * as usuarioRepositorio from "./repositories/usuarioRepositorio";
import UsuarioRouter from "./routes/Routes";

//  CLASSE QUE GERA O APP
class App {
    public api: express.Application;
    private database: Database;

    //  Constrói os módulos usados pelo app
    constructor () {
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

    private middleware(): void {
        this.api.use(bodyParser.json());
        this.api.use(bodyParser.urlencoded({ extended: false}));
        //this.api.use(debug);
    }

    routes(): void {
        let router: express.Router;
        router = express.Router();

        this.api.use('/', router);
        this.api.use('/api/v1/usuarios', UsuarioRouter);
    }

    db() {
        this.database = new Database();
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
        this.database.closeConnection(message, () => callback())
    }
}

export default new App().api;