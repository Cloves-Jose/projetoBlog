const { Router } = require('express')
const PostController = require('../controller/PostController')
const { middlewareAutenticacao } = require('../helper/')
const router = Router()

router
    .post('/criarPost', middlewareAutenticacao.bearer, PostController.criarPost)
    .get('/listarPost', PostController.listarPost)

module.exports = router