import { Router, Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import bcrypt = require("bcrypt");
import usuarioSchema from "../schemas/usuarioSchema";

class UsuarioController {
  constructor() {}

  /**
   * Função que lista todos os usuários cadastrados no BD
   * @param req
   * @param res
   */
  public listUsuarios(req: Request, res: Response): void {
    usuarioSchema
      .find({})
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch(err => {
        const status = res.statusCode;
        res.json({ status, err });
      });
  }

  /**
   * Função que realiza o cadastro de um novo usuário no BD
   * @param req parâmetros do usuário
   * @param res
   */
  public createUsuario(req: Request, res: Response): void {
    const nome: string = req.body.nome;
    const login: string = req.body.login;
    let senha_cript: string = req.body.senha;

    //  Faz a criptografia da senha para ser salva no BD
    let senha = bcrypt.hashSync(senha_cript, 10);
    let senha_descrip: boolean = bcrypt.compareSync(senha_cript, senha);

    //  Cria objeto do tipo Usuário
    const usuario = new usuarioSchema({
      nome,
      login,
      senha
    });

    //  Insere objeto Usuário no BD
    usuario
      .save()
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
        console.log(
          "Novo usuário cadastrado com sucesso!\nnome: " +
            nome +
            "\nlogin: " +
            login +
            "\nsenha: " +
            senha +
            "\nBcrypt: " +
            senha_cript +
            "\nDescriptografia: " +
            senha_descrip
        );
      })
      .catch(err => {
        const status = res.statusCode;
        res.json({ status, err });
      });
  }

  /**
   * Função que atualiza os dados do usuário cadastrado no BD
   * @param req
   * @param res
   */
  public updateUsuario(req: Request, res: Response): void {
    const login: string = req.params.login;

    usuarioSchema
      .findOneAndUpdate({ login }, req.body)
      .then(data => {
        res.status(200).json({ data });
        console.log("Usuário de login " + login + " teve dados alterados!");
      })
      .catch(err => {
        const status = res.statusCode;
        res.json({ status, err });
      });
  }

  /**
   * Função que deleta o usuário do BD
   * @param req
   * @param res
   */
  public deleteUsuario(req: Request, res: Response): void {
    const login: string = req.params.login;

    usuarioSchema
      .findOneAndRemove({ login }, req.body)
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
        console.log("Usuário de login " + login + " foi deletado!");
      })
      .catch(err => {
        const status = res.statusCode;
        res.json({ status, err });
      });
  }

  //public validateLogin(req: Request, res: Response): {

  //}

  public validateToken(req: Request, res: Response): boolean {
    const login_aux: string = req.params.login;
    const senha_aux: string = req.params.senha;
    let isValid: boolean = false;

    usuarioSchema.findOne({ 'login': login_aux }, 'senha', ((err, res) => {
        console.log(res.get('senha'));
        let senha =  res.get('senha');
        isValid = bcrypt.compareSync(senha_aux, senha);
        console.log(isValid);
    }));

    return isValid;
  }
}

const usuarioController = new UsuarioController();
export default usuarioController;
