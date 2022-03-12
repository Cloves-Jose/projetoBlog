const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const { UsuarioServices }  = require('../services')
const { InvalidArgumentError } = require('../err/erros')


const usuarioService = new UsuarioServices()

function verificaUsuario(usuario) {
    if(!usuario) {
        throw new InvalidArgumentError(`Não existe usuário com esse e-mail`)
    }
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash)
    if(!senhaValida) {
        throw new InvalidArgumentError(`E-mail ou senha inválidos`)
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try{
            const usuario = await usuarioService.buscaPorEmail(email);
            verificaUsuario(usuario)
            await verificaSenha(senha, usuario.senha)

            done(null, usuario)
        }catch(error){
            done(error)
        }
    })
)
