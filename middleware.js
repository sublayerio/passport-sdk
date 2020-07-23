const jwt = require('./jwt')
const debug = require('./debug')

const extractTokenFromHeaders = (headers) => {
    const { authorization } = headers
    if (!authorization) {
        return null
    }
    const parts = authorization.split(' ')
    if (parts.length !== 2) {
        return null
    }
    if (parts[0] !== 'Bearer') {
        return null
    }
    // if (globalId.isOfType('key', parts[1]) === false) return null
    return parts[1]
}

module.exports = async (req, res, next) => {

    let token = req.query.token

    if (!token) {
        token = extractTokenFromHeaders(req.headers)
    }

    debug('token', token)

    if (!token) {
        return next()
    }

    let decoded = null

    try {
        
        decoded = await jwt.verify(token)

    } catch (e) {
        next()
        return
    }

    debug(`authenticated ${decoded.name}`)

    req.session = decoded

    next()
}