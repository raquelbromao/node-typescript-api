import { Router, Request, Response, NextFunction }  from 'express';
import * as mongoose from 'mongoose';
import bcrypt = require('bcrypt');
import usuarioSchema from '../schemas/usuarioSchema';
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
    //this.router.get('/login/:login&&:senha', usuarioController.validateToken); //  Valida token do usuário no login
    this.router.post('/login/:login/:senha', usuarioController.validateToken); //  Valida token do usuário no login
    this.router.post('/teste/:teste', usuarioController.enviarDados);
  }
}

//  Exportação
const usuarioRoutes = new UsuarioRouter();
usuarioRoutes.routes();
export default usuarioRoutes.router;
