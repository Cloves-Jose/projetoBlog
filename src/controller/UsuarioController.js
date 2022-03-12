const { UsuarioServices } = require('../services')
const usuarioServices = new UsuarioServices()

const { InvalidArgumentError, InternalServerError } = require('../err/erros')


class UsuarioController {

    static async adicionarUsuario(req, res) {
        const usuario = req.body
        const emailUsuario = req.body.email
        try{
            const resultado = await usuarioServices.registraUsuario(emailUsuario, usuario)
            res.status(201).json(resultado)

        } catch(error) {
            if (error instanceof InvalidArgumentError) {
                res.status(422).json({error: error.message})
            } else if(error instanceof InternalServerError) {
                res.status(500).json({error: error.message})
            } else {
                res.status(500).json({erro: error.message})
            }
        }
    }

    static async login(req, res) {
        res.status(204).send()
    }

    static async listarUsuario(req, res) {
        try {
            const resultado = await usuarioServices.listarRegistro()
            res.status(200).json(resultado)

        } catch(error) {
           if(error instanceof InternalServerError) {
               res.status(500).json({error: error.message})
           }
        }
    }

    static async deletarUsarioId(req, res) {
        const { id } = req.params
        try {
            await usuarioServices.deletarUsuario(id)
            res.status(200).json(`Usuario de id ${id} deletado com sucesso`)
        } catch(error) {
            res.status(500).json(error.message)
        }
    }


}

module.exports = UsuarioController