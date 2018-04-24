"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql = require("mssql");
const configuracoesGlobais_1 = require("./configuracoesGlobais");
const clienteSchema_1 = require("../schemas/clienteSchema");
const produtoSchema_1 = require("../schemas/produtoSchema");
const municipioSchema_1 = require("../schemas/municipioSchema");
const departamentoSchema_1 = require("../schemas/departamentoSchema");
const vendedorSchema_1 = require("../schemas/vendedorSchema");
class sqlDatabase {
    constructor() { }
    /**
     *
     * @param res
     * @param query
     */
    appQuery(res, query) {
        this.dbSQL = new mssql.ConnectionPool(configuracoesGlobais_1.configSQL);
        var request = new mssql.Request(this.dbSQL);
        this.dbSQL.connect(function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
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
    }
    ;
    getTableAndInsert(tabela, campos, res) {
        this.dbSQL = new mssql.ConnectionPool(configuracoesGlobais_1.configSQL);
        var request = new mssql.Request(this.dbSQL);
        let query = 'SELECT ' + campos + ' FROM ' + tabela + '';
        this.dbSQL.connect(function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log('MSSQL está conectado!');
                //  REQUISITA SQL CLIENTES
                request.query(query)
                    .then(recordSet => {
                    //console.log(recordSet.recordset);
                    recordSet.recordset.forEach(dados => {
                        if (tabela == 'MUNICIPIOS') {
                            //  Cria Objeto Municipio a ser inserido no BD
                            let municipio = new municipioSchema_1.default(dados);
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
                            let cliente = new clienteSchema_1.default(dados);
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
                            let produto = new produtoSchema_1.default(dados);
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
                            let departamento = new departamentoSchema_1.default(dados);
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
                            let vendedor = new vendedorSchema_1.default(dados);
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
    }
    ;
    closeConnection() {
        this.dbSQL.close();
    }
}
exports.default = sqlDatabase;
