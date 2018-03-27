import { Router } from "express";
import authController from '../controllers/authController';

class AuthRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    } 

    /**
    * Função que cria e define as rotas e suas respectivas funções no UserController
    */
    routes() {
        this.router.post('/', authController.auth); 
    }
}

//  Exportação
const authRoutes = new AuthRouter();
authRoutes.routes();
export default authRoutes.router;


