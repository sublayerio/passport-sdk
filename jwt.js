const jwt = require('jsonwebtoken')
const debug = require('./debug')

const sign = async ({ sub, name }, { expiresIn }) => {

    const payload = {
        iss: process.env.JWT_ISS,
        aud: process.env.JWT_AUD,
        sub,
        name,
    }

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, result) => {

            if (err) {
                reject(err)
                return
            }

            resolve(result)
        })
    })
}

const verify = async (encoded) => {

    return new Promise(resolve => {

        jwt.verify(encoded, process.env.JWT_SECRET, { algorithms: ["HS256"] }, (err, decoded) => {

            if (err) {
                debug(err)
                resolve(false)
                return
            }

            resolve(decoded)
        })
    })
}

const decode = token => jwt.decode(token)

module.exports = {
    sign,
    verify,
    decode
}