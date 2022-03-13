const { PostServices } = require('../services')
const { InvalidArgumentError, InternalServerError } = require('../err/erros')
const postServices = new PostServices()

class PostController {

    static async criarPost(req, res){
        const postagem = req.body
        try{
            const post = await postServices.criarRegistro(postagem)
            res.status(201).send(post)

        } catch(error) {
            if(error instanceof InvalidArgumentError) {
                res.status(422).json({error: error.message})
            } else if (error instanceof InternalServerError) {
                res.status(500).json({error: error.message})
            } else {
                res.status(500).json({error: error.message})
            }
        }
    }

    static async listarPost(req, res) {
        try{
            const posts = await postServices.listarRegistro()
            res.status(200).json(posts)
        } catch(error) {
            res.status(500).json({error: error})
        }
    }
}

module.exports = PostController