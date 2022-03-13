const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { UsuarioServices }  = require('../services')
const { InvalidArgumentError } = require('../err/erros')

const blacklist = require('../../redis/manipula-blacklist')


const usuarioService = new UsuarioServices()

function verificaUsuario(usuario) {
    if(!usuario) {
        throw new InvalidArgumentError(`Não existe usuário com esse e-mail`)
    }
}

async function verificaTokenNaBlackList(token) {
    const tokenNaBlackList = await blacklist.contemTokem(token)
   if(tokenNaBlackList){
        throw new jwt.JsonWebTokenError(`Token inválido por logout!`)
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

passport.use(
    new BearerStrategy(
        async (token, done) => {
           try{
               await verificaTokenNaBlackList(token)
               const payload = jwt.verify(token, process.env.SECRET_KEY);
               const usuario = await usuarioService.buscarUsuarioPorId(payload.id)
               done(null, usuario, { token: token });
           } catch(error){
                done(error)
           }
        }
    )
)
