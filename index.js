"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const App_1 = require("./App");
const port = 3000;
App_1.default.api.set('port', port);
//  Cria o servidor e passa a api pra ele
const server = http.createServer(App_1.default.api);
server.listen(port);
server.on('listening', onListening);
/**
 * Normaliza a porta para um número, string ou booleano
 * @param val valor da porta
 */
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
/**
 * Função que diz que a porta do servidor está ativa
 */
function onListening() {
    console.log('Ouvindo na porta: ' + port);
}
