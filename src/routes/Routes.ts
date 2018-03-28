import { Router }  from 'express';
import bcrypt = require('bcrypt');
import usuarioController from '../controllers/usuarioController';

class UsuarioRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();

  }
  
  /**
   * Função que cria e define as rotas e suas respectivas funções no UserController
   */
  routes() {
    this.router.get('/', usuarioController.listUsuarios); // Rota para listar todos os usuários inseridos no BD
    this.router.post('/', usuarioController.createUsuario);  //  Rota para criar usuário e inserir no BD
    this.router.put('/:login', usuarioController.updateUsuario); //  Rota para atualizar dados do usuário no BD
    this.router.delete('/:login', usuarioController.deleteUsuario);  //  Rota para deletar usuário do BD
    this.router.post('/login', usuarioController.validateToken); //  Valida token do usuário no login
    this.router.post('/receberDados', usuarioController.receberDados); //  Rota para receber e tratar JSON do SQLServer
    this.router.post('/enviarDados', usuarioController.enviarDados); //  Rota que envia os dados solicitados pelo cliente (APP)
    //this.router.get('/teste/auth', usuarioController.testarToken); // Testa o uso de token em rotas -> funcionou
  }
}

//  Exportação
const usuarioRoutes = new UsuarioRouter();
usuarioRoutes.routes();
export default usuarioRoutes.router;

