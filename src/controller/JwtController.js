const jwt = require('jsonwebtoken')

class JwtController {
    static criarTokenJWT(usuario) {
        const payload = {
            id: usuario.id
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });
        return token
    }
}

module.exports = JwtController