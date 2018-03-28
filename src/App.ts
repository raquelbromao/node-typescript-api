import * as express from 'express'
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import Database from "./config/Database";
import * as Route from "./routes/Routes";
import usuarioRouter from "./routes/Routes";
import authRouter from "./routes/authRoutes";
import Auth, {default as auth} from "./auth"

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
        //  Habilita as configurações do cors
        //this.enableCors();
        //  Cria as rotas
        this.routes();
        //  Cria o BD
        this.db();
    }

    private middleware(): void {
        this.api.use(morgan('dev'));
        this.api.use(bodyParser.json());
        this.api.use(bodyParser.urlencoded({ extended: false}));
       // this.api.use(Auth.initialize());
    }

    enableCors() {
        const options:  cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "token", "Authorization"],
            exposedHeaders: ["token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false
        };
        this.api.use(cors(options));
    }

    routes(): void {
        let router: express.Router;
        router = express.Router();

        this.api.use('/', router);
        this.api.use('/api/v1/usuarios', auth.authenticate(), usuarioRouter);
        this.api.use('/api/v1/auth', authRouter)
    }

    db() {
        this.database = new Database();
        this.databaseConnection();
    }

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