const database = require('../models')

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async criarRegistro(registro) {
        return database[this.nomeDoModelo].create(registro)
    }

    async listarRegistro() {
        return database[this.nomeDoModelo].findAll()
    }

    async deletarRegistro(id) {
        return database[this.nomeDoModelo].findOne({where: {id: id}})
    }
}

module.exports = Services