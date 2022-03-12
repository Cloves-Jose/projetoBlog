const database = require('../models')

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async criarRegistro(registro) {
        return await database[this.nomeDoModelo].create(registro)
    }

    async listarRegistro(where = {}) {
        return await database[this.nomeDoModelo].findAll({where: {...where}})
    }

    async deletarRegistro(id) {
        return await database[this.nomeDoModelo].destroy({where: {id: id}})
    }

    async buscarRegistroPorId(id) {
        return await database[this.nomeDoModelo].findOne({where: {id: id}})
    }
}

module.exports = Services