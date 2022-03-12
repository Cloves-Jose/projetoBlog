const { Router } = require('express')
const UsuarioController = require('../controller/UsuarioController')

const router = Router()

router
    .post('/usuarioCadastro', UsuarioController.adicionarUsuario)
    .get('/usuarioListar', UsuarioController.listarUsuario)
    .delete('/usuarioDeletar/:id', UsuarioController.deletarUsarioId)
module.exports = router