import passport = require('passport');
import usuarioSchema from './schemas/usuarioSchema';
var ExtractJwt = require('passport-jwt').ExtractJwt;
var Strategy = require('passport-jwt').Strategy;

class Auth {

    constructor() {
        //console.log('Entrou no construtor do Auth');

        const params = {
            secretOrKey: "MyS3cr3tK3Y",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        };

        let strategy = new Strategy (params, function (payload, done) {

            usuarioSchema.findById(payload.id)
                .then(usuario => {
                    if (usuario != null) {
                        console.log(usuario);
                        console.log(payload);
                        return done(null, usuario.get('_id'));
                    } else {
                        return done(new Error('Usuário nulo'), null);
                    }
                })
                .catch(err => {
                    console.log('Usuário não encontrado');
                    return done(new Error('Usuário não encontrado'), null);
                });

        });

        passport.use(strategy);
    }

    initialize () {
        return passport.initialize();
    }

    authenticate () {
        return  passport.authenticate("jwt", {session: false});
    }
}

export default new Auth();