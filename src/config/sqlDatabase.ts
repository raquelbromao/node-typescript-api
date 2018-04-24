import * as mssql from 'mssql';
import { configSQL } from "./configuracoesGlobais";
import { callbackify } from 'util';
import { Router, Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import CLIENTES from "../schemas/clienteSchema";
import PRODUTO from "../schemas/produtoSchema";
import MUNICIPIOS from "../schemas/municipioSchema";
import DEPARTAMENTO from "../schemas/departamentoSchema";
import VENDEDOR from "../schemas/vendedorSchema";


class sqlDatabase {
    public dbSQL: any;

    constructor() {}

    /**
     * 
     * @param res 
     * @param query 
     */
    appQuery(res: Response, query) : any {
        this.dbSQL = new mssql.ConnectionPool(configSQL);
        var request = new mssql.Request(this.dbSQL);

        this.dbSQL.connect(function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                request.query(query)
                 .then(recordSet => {
                    let data = JSON.stringify(recordSet.recordset);
                    res.status(200).send(data);
                })
                 .catch(err => {
                    console.log(err);
                    res.send(err);
                });
            }
        });
        
    };

    getTableAndInsert(tabela, campos, res: Response) : any {
        this.dbSQL = new mssql.ConnectionPool(configSQL);
        var request = new mssql.Request(this.dbSQL);

        let query = 'SELECT '+ campos +' FROM ' + tabela+'';

        this.dbSQL.connect(function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log('MSSQL está conectado!');

                //  REQUISITA SQL CLIENTES
                request.query(query)
                 .then(recordSet => {
                    //console.log(recordSet.recordset);
                    recordSet.recordset.forEach(dados => {

                        if (tabela == 'MUNICIPIOS') {
                            //  Cria Objeto Municipio a ser inserido no BD
                            let municipio = new MUNICIPIOS(dados);

                            //  Salva municipio no MONGO
                            municipio
                                .save()
                                .then(data => {
                                    console.log('.');
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(401).json(err);
                                });
                        }

                        if (tabela == 'VW_CLIENTE_PALM') {
                            //console.log('solicitou tabela CLIENTES');
                            //console.log(dados);
                            let cliente = new CLIENTES(dados);
                            cliente
                                .save()
                                .then(data => {
                                    console.log(data);
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(401).json(err);
                                });
                        }

                        if (tabela == 'PRODUTO') {
                            //  Cria Objeto Produto a ser inserido no BD
                            let produto = new PRODUTO(dados);

                            //console.log(produto);
                            //  Salva produto no MONGO
                            produto
                                .save()
                                .then(data => {
                                    console.log(data);              
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(401).json(err);
                                });      
                        }

                        if (tabela == 'DEPARTAMENTO') {
                            //  Cria Objeto Departamento a ser inserido no BD
                            let departamento = new DEPARTAMENTO(dados);

                            // Salva departamento no MONGO
                            departamento
                                .save()
                                .then(data => {
                                    console.log(data);
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(401).json(err);
                                });
                        }

                        if (tabela == 'VENDEDOR') {
                            //  Cria Objeto Vendedor a ser inserido no BD
                            let vendedor = new VENDEDOR(dados);

                            //console.log(vendedor);
                            //  Salva vendedor no MONGO
                            vendedor
                                .save()
                                .then(data => {
                                    console.log(data);              
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(401).json(err);
                                });
                        }
                                                  
                    });

                    res.status(201).send('Banco populado');
                })
                 .catch(err => {
                    console.log(err);
                    res.send(err);
                });
            }
        });
        
    };

    closeConnection() {
        this.dbSQL.close();
    }
}

export default sqlDatabase;