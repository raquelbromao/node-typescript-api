"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");
const usuarioSchema_1 = require("../schemas/usuarioSchema");
class AuthController {
    constructor() { }
    auth(req, res) {
        const login = req.body.login;
        const senha = req.body.senha;
        console.log(JSON.stringify(req.header));
        console.log(req.header);
        console.log(req);
        usuarioSchema_1.default.findOne({ login: req.body.login })
            .then(usuario => {
            if (usuario) {
                if (bcrypt.compareSync(senha, usuario.get('senha'))) {
                    var payload = {
                        id: usuario.get('_id')
                    };
                    var token = jwt.encode(payload, 'MyS3cr3tK3Y');
                    let response = {
                        token: token
                    };
                    console.log(response);
                    res.status(200).json(response);
                }
                else {
                    res.sendStatus(401);
                }
            }
            else {
                res.sendStatus(401);
            }
        })
            .catch(err => {
            res.sendStatus(401);
        });
    }
}
const authController = new AuthController();
exports.default = authController;
