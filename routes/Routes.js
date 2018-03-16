"use strict";
var Routes;
(function (Routes) {
    class Usuario {
        index(req, res, next) {
            res.send("Oi");
        }
    }
    Routes.Usuario = Usuario;
})(Routes || (Routes = {}));
module.exports = Routes;
