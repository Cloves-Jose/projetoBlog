const { Router } = require('express')
const UsuarioController = require('../controller/UsuarioController')
const { middlewareAutenticacao } = require('../helper')

const router = Router()

router
    .post('/usuarioLogin', middlewareAutenticacao.local, UsuarioController.login)

router
    .get('/usuarioLogout', middlewareAutenticacao.bearer, UsuarioController.logout)

router
    .post('/usuarioCadastro', UsuarioController.adicionarUsuario)
    .get('/usuarioListar', UsuarioController.listarUsuario)
    .delete('/usuarioDeletar/:id', middlewareAutenticacao.bearer, UsuarioController.deletarUsarioId)
    
module.exports = router