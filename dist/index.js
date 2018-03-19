"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const App_1 = require("./App");
const port = (process.env.PORT || 3000);
App_1.default.set('port', port);
//  Cria o servidor e passa a api pra ele
const server = http.createServer(App_1.default);
server.listen(port);
server.on('listening', onListening);
/**
 * Função que diz que a porta do servidor está ativa
 */
function onListening() {
    let address = server.address();
    console.log('Ouvindo na porta: ' + port + ' || address: ' + address);
}
