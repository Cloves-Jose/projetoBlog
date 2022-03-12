const { Router } = require('express')
const UsuarioController = require('../controller/UsuarioController')
const passport = require('passport')

const router = Router()

router
    .post('/usuarioLogin', passport.authenticate('local', { session: false }), UsuarioController.login)

router
    .post('/usuarioCadastro', UsuarioController.adicionarUsuario)
    .get('/usuarioListar', UsuarioController.listarUsuario)
    .delete('/usuarioDeletar/:id', UsuarioController.deletarUsarioId)
module.exports = router