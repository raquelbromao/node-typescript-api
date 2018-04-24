"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const configuracoesGlobais_1 = require("./configuracoesGlobais");
class Database {
    constructor() {
        //private DB_URI = 'mongodb://localhost/node-ts-api';
        this.DB_URI = configuracoesGlobais_1.configMongo.uri;
    }
    createConnection() {
        mongoose.connect(this.DB_URI);
        this.logger(this.DB_URI);
    }
    logger(uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', () => console.log('Mongoose está conectado' /*em ' + uri*/));
        this.DB_CONNECTION.on('error', error => console.error.bind(console, 'Mongoose - Erro na conexão: ${error}'));
        this.DB_CONNECTION.on('disconnected', () => console.log('Mongoose desconectado em: ${uri}'));
    }
    closeConnection(message, callback) {
        this.DB_CONNECTION.clone(() => {
            console.log('Mongoose desconectado por: ${message}');
            callback();
        });
    }
}
exports.default = Database;
