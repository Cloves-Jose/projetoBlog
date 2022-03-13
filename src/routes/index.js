const bodyParser = require('body-parser')

const usuario = require('./usuarioRoutes')
const post = require('./postRoutes')


module.exports = app => {
    app.use(
        bodyParser.json(),
        usuario,
        post
    )
}