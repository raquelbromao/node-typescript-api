import { Router } from "express";
import databaseController from "../controllers/databaseController";

class DatabaseRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * Função que cria e define as rotas e suas respectivas funções no UserController
   */
  routes() {
    this.router.get("/receberTabelasSQL",databaseController.receiveFromMSSQLandInsertMONGO.bind(databaseController)); 
  }
}

//  Exportação
const databaseRoutes = new DatabaseRouter();
databaseRoutes.routes();
export default databaseRoutes.router;


