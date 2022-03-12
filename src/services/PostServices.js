const Services = require('./Services')

class PostServices extends Services{
    constructor() {
        super('Posts')
    }
}

module.exports = PostServices