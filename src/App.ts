import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';

import Auth, {default as auth} from "./auth";

import * as mssql from 'mssql';
import * as pouchDB from 'pouchdb';

import mongoDatabase from "./config/Database";
import sqlDatabase from "./config/sqlDatabase";

import * as Route from "./routes/Routes";
import usuarioRouter from "./routes/Routes";
import authRouter from "./routes/authRoutes";
import databaseRouter from "./routes/databaseRoutes";


//  CLASSE QUE GERA O APP
class App {
    public api: express.Application;
    private mongoDatabase: mongoDatabase;
    private sqlDatabase: sqlDatabase;
    public dbMMSQL: any;

    //  Constrói os módulos usados pelo app
    constructor () {
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

    private middleware(): void {
        this.api.use(morgan('dev'));
        this.api.use(bodyParser.json());
        this.api.use(bodyParser.urlencoded({ extended: false}));
        this.api.use(Auth.initialize());
    }

    enableCors() {
        const options:  cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false
        };
        this.api.use(cors(options));
    }

    db() {
        this.mongoDatabase = new mongoDatabase();
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
        
    routes(): void {
        let router: express.Router;
        router = express.Router();

        //var set1 = require('./routes/Routes')(this.dbMMSQL);

        this.api.use('/', router);
        this.api.use('/api/v1/usuarios', auth.authenticate(), usuarioRouter);
        this.api.use('/api/v1/auth', authRouter)
        this.api.use('/api/v1/sincronizacaoInicial', databaseRouter)
    }

    /*dbSQL() {
        this.sqlDatabase = new sqlDatabase();
        //this.sqlDatabase.createConnection('SELECT TOP 2 CLI_ID FROM CLIENTES FOR JSON PATH');
        //this.dbMMSQL = this.sqlDatabase.createConnection();

        const config = {
            user: 'sa',
            password: 'aram98',
            server: 'CAIO',
            port: 1433,
            database: 'Estoque'
        }

        var dbSQL = new mssql.ConnectionPool(config); //    dbSQL = connection pool
        //var clientes = new mssql.Request(dbSQL);

        //  Requisita rotas  e usa a mesma conexão do SQL Server para todas
        var set1 = require('./routes/Routes')(dbSQL);

        dbSQL.connect(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('MSSQL está conectado')
                return;
            }

            var campos = 'CLI_ID ,CLI_NOMEFANTASIA, CLI_NOME, CLI_INSCRICAO, CLI_INSCRICAO_MUN, CLI_CPF, CLI_ENDERECO, CLI_BAIRRO, CLI_CEP, CLI_CIDADE, CLI_ESTADO, CLI_CELULARFAX, CLI_EMAIL, CLI_CONTATO, CLI_TELEFONE ,CLI_TELEFONE1, CLI_TELEFONE2, CLI_ENDERECOCOBRANCA, CLI_BAIRROCOBRANCA, CLI_CEPCOBRANCA, CLI_CIDADECOBRANCA, CLI_ESTADOCOBRANCA, CLI_CREDITO';
            clientes.query('SELECT TOP 2 '+ campos +'  FROM CLIENTES', function (err, recordSet) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(recordSet.recordset);
                }
                dbSQL.close();
            })
        });   
        
    }*/
}

export default new App().api;