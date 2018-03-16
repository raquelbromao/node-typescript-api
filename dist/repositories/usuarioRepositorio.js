/*import mongoose = require("mongoose");
import usuarioSchema from "../schemas/usuarioSchema";

class usuarioRepositorio {
    private usuarioModel;

    constructor() {
        this.usuarioModel = mongoose.model('Usuario', usuarioSchema);
    }

    getAll() {
        return this.usuarioModel.find({});
    }

    getById(_id) {
        return this.usuarioModel.findById(_id);
    }

    create(usuario){
        return this.usuarioModel.create(usuario);
    }

    update(_id, usuario) {
        const uptadeUsuario = (<any>Object).assign({}, usuario);
        return this.usuarioModel.findByIdAndUpdate(_id, uptadeUsuario, {new: true});
    }

    delete(_id) {
        return this.usuarioModel.findByIdAndRemove(_id);
    }
}

export default new usuarioRepositorio;*/
