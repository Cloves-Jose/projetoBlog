const bcrypt = require('bcrypt')
const Services = require('./Services')
const database = require('../models')
const { InvalidArgumentError } = require('../err/erros')
const portugues = require('../lang/portugues')

class UsuarioServices extends Services {
    constructor(){
        super('Usuarios')
    }

    async buscaPorEmail(email){
        return await database[this.nomeDoModelo].findOne({
            where: {
                email: email
            }
        })
    }

    async buscarUsuarioPorId(id) {
        const usuario = await this.buscarRegistroPorId(id)
        if(!usuario) {
            return null
        }
        return usuario
    }

    async deletarUsuario(id) {
        return await this.deletarRegistro(id)
    }

    async registraUsuario(email, registro) {
        const usuarioCadastrado = await this.buscaPorEmail(email)

        if(!usuarioCadastrado){
            return await this.criarRegistro(registro)
        } else {
            throw new InvalidArgumentError(portugues.usuarioService.usuarioExistente)
        }
    }

    // gerarSenhaHash(senha){
    //     const custoHash = 12
    //     return bcrypt.hash(senha, custoHash)
    // }
}

module.exports = UsuarioServices