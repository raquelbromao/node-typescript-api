import { Router, Request, Response, NextFunction } from "express";
import bcrypt = require("bcrypt");
import * as mongoose from "mongoose";
import sqlDatabase from '../config/sqlDatabase'
import * as httpStatus from "http-status";
import usuarioSchema from "../schemas/usuarioSchema";
import PRODUTOS from "../schemas/produtoSchema";
import DEPARTAMENTO from "../schemas/departamentoSchema";
import VENDEDOR from "../schemas/vendedorSchema";
import CLIENTE from "../schemas/clienteSchema";
import { JsonWebTokenError } from "jsonwebtoken";

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
   * @param req 
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

  /**
   * Função que valida o login
   * 
   * @param req 
   * @param res 
   */
  public validateToken(req: Request, res: Response) {
    const login_aux = req.body.email;
    const senha_aux = req.body.senha;
    let eValida: boolean = false;

    usuarioSchema
      .findOne({ login: login_aux }, "senha")
      .then(res => {
        //console.log(res.get('senha'));
        let senha = res.get("senha");
        eValida = bcrypt.compareSync(senha_aux, senha);
        console.log("A senha informada é válida? -> " + eValida);
      })
      .catch(err => {
        const status = res.statusCode;
        console.log("Status: " + status + "\nErro: " + err);
        res.status(404).send(err);
      });

    //console.log(req.params.login);
    //console.log(req.params.senha);
    //console.log(req.params);
    (eValida)? res.status(200).json({ mensagem: "login liberado" }):
                res.status(404).json({ mensagem: "ERRO" });
  }

  public testToken(req: Request, res: Response) {
    res.status(200).json({mensagem: "Acesso Autorizado"});
  }

  public testarRecuperacaoDeUsuario(req: Request, res: Response) {
    // Recebe a ID do usuário e faz a procura
    var usuario_senha = null; 
    usuarioSchema.findById(req.params.id)
      .then(usuario => {
        if (usuario) {
          usuario_senha = usuario.get("senha");
          console.log(usuario.get("senha"));
          console.log(usuario.get("nome"));
        } else {
          res.sendStatus(401);
        }
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });

    //console.log(usuario_senha);
    res.sendStatus(200);
  }

  /**
   * Função para receber os dados do SQLServer
   * 
   * @param req 
   * @param res 
   */
  public receberDadosSQL (req: Request, res: Response) {
    //  Faz análise dos usuários contidos no json
    let usuariosJson = req.body.usuarios;
    for (const item in usuariosJson) {

      // FAZ A CRIPTOGRAFIA DA SENHA
      let senha_descriptografada = usuariosJson[item].senha;
      let senha_criptografada = bcrypt.hashSync(senha_descriptografada,10);
      console.log(senha_criptografada);
      usuariosJson[item].senha = senha_criptografada;

      const usuarioNovo = new usuarioSchema(usuariosJson[item]);

      usuarioNovo
        .save()
        .then(data => {
          console.log('Novo usuário cadastrado com sucesso! -> ' + data);
        })
        .catch(err => {
          console.log('Erro ao salvar usuario no BD -> ' + err);
        })
    }

    console.log("---------------------------");

    //  Faz análise dos produtos contidos no json
   /* let produtosJson = req.body.produtos;
      for (const item in produtosJson) {
        console.log(produtosJson[item]);
        let produto = produtosJson[item];
        console.log(produto);

        let produtoNovo = new produtoSchema(produto);

        produtoNovo
          .save()
          .then(data => {
            console.log("Novo produto cadastrado com sucesso! -> " + data);
          })
          .catch(err => {
            console.log("Erro ao salvar produtoo no BD -> " + err);
          });

        console.log("---------------------------");
      }*/

    res.sendStatus(200);
  }
  
  /**
   * Função que envia os dados do BD para o APP, quando este último requisitar
   * Enviado em formato JSON
   * 
   * @param req 
   * @param res 
   */
  public async testeQuerys (req: Request, res: Response) {
    //let camposVendedor = 'VDD_ID, VDD_NOME, VDD_SENHA_PALM, VDD_PERC_DESC_MAX, VDD_MAX_PEDIDOS';
    //let camposEmpresa = 'EMP_NOME, EMP_TELEFONE';
    //let camposParams = 'PAR_PALM_BLOQ_SEM_ESTOQUE, PAR_PALM_FABRICANTE, PAR_PALM_CAMPOS_OBRIG, PAR_PALM_MULTIPLO, PAR_PALM_CONTROLE_SALDO_CLI, PAR_PALM_BLOQ_CLI_PF, PAR_PALM_BLOQ_PEDIDO_PF';

    //var query = 'SELECT ' + camposEmpresa + ' FROM EMPRESAS';
    //var query = 'SELECT ' + camposVendedor + ' FROM VENDEDOR';
    //var query = 'SELECT ' + camposParams + ' FROM PARAMS';

    var query = "SELECT PRO_NOVO = (CASE WHEN DATEDIFF(dd,PRO_DATACADASTRO,GETDATE()) <= 7 THEN 'S' ELSE 'N' END) FROM PRODUTO";
    var query2 = "SELECT PRO_ESTOQUE, PRO_FALTA = (CASE WHEN PRO_ESTOQUE <= 0 THEN 'S' ELSE 'N' END) FROM PRODUTO";
    var query3 = "SELECT V.PRO_PROMOCAO FROM VW_PRODUTO_EXPORT V WHERE PRODUTO.PRO_ID = VW_PRODUTO_EXPORT.PRO_ID";
    var query4 = "SELECT PRO_PROMOCAO = (SELECT v.PRO_PROMOCAO FROM VW_PRODUTO_EXPORT v INNER JOIN PRODUTO t ON t.PRO_ID = v.PRO_ID) FROM PRODUTO";
    var query5 = "SELECT VDD_BLOQ_PEDIDO_XDIAS = (SELECT DIAS = (case when PAR_EXP_REC_PDA = 'S' or PAR_PALM_BLOQ_RESTRITOS = 'S' then isnull(PAR_DIASDECARENCIA,0) else 0 end) FROM PARAMS) FROM VENDEDOR";
    var query6 = "SELECT CODIGOCLIENTE, FANTASIA, RAZAOSOCIAL, ENDERECO, BAIRRO, CODIGOCIDADE, CEP, FAX, EMAIL, PESSOAFJ, CNPJCPF, INSCRICAOESTADUAL, INSCRICAOMUNICIPAL, CONTATO1, CONTATO2, TIMEHOBBY1, TIMEHOBBY2, TELEFONE1, TELEFONE2, ANIVERSARIO1, ANIVERSARIO2, VIP, LIMITECREDITO, TOTALTITULOSVENCIDOS, TOTALTITULOSAVENCER, SALDO, ENDERECOENTREGA, BAIRROENTREGA, CODIGOCIDADEENTREGA, CEPENTREGA, ENDERECOCOBRANCA, BAIRROCOBRANCA, CODIGOCIDADECOBRANCA, CEPCOBRANCA, CODIGOCATEGORIA, CODIGOATIVIDADE, CAIXAPOSTAL, HOMEPAGE, CODIGOTABELA, CODIGOCONDICAOPAGTO, CODIGOFORMAPAGTO, NUMERO, CAST('' AS VARCHAR), CAST('' AS VARCHAR) FROM VW_CLIENTE_PALM";
    var db = new sqlDatabase();
    db.appQuery(res, query6);
  }
  
  /**
   * 
   * @param req 
   * @param res 
   */
  public async sincronizacaoInicial(req: Request, res: Response) {
    await PRODUTOS
      .find({})
      .then(produtos => {
        VENDEDOR
          .find({})
          .then(vendedores => {
            CLIENTE
            .find({})
            .then(clientes => {
              res.status(200).json({ produtos, vendedores, clientes });
            })
            .catch(err => {
              res.status(404).json({ err });
            });
          })
          .catch(err => {
            res.status(404).json({ err });
          });
      })
      .catch(err => {
        res.status(404).json({ err });
      });
  }

  /*public enviarDados(req: Request, res: Response) {
    console.log(req.headers);
    
    produtoSchema.find({}, 'nome codigo estoque')  
      .then(produtos => {
        res.status(200).end(JSON.stringify(produtos));
      })
      .catch(err => {
        return res.status(404).json(err);
    });
}*/

  /*public fun1 () : any {
    setTimeout(function() {
      //return 4000;
    }, 15000);
    console.log('F1');

  }

  public fun2 () : any {
    setTimeout(() => {
      //return 500;
    }, 500);
    console.log('F2');

  }
  
  public async testarComAsyncAwait(req: Request, res: Response) {
    await this.fun1();
    await this.fun2();
    console.log('pronto');
  }

  public testarSemAsyncAwait(req: Request, res: Response) {
    let x = this.fun1();
    let y = this.fun2();
    console.log('pronto');
  }*/

}

const usuarioController = new UsuarioController();
export default usuarioController;

