import * as http from 'http';
import * as debug from 'debug';
import App from './App';

const port = (process.env.PORT || 3000);
App.set('port',port);

//  Cria o servidor e passa a api pra ele
const server = http.createServer(App);
server.listen(port);
server.on('listening', onListening);

/**
 * Função que diz que a porta do servidor está ativa
 */
function onListening(): void {
    let address = server.address();
    console.log('Ouvindo na porta: ' + port + ' || address: ' + address);
}
