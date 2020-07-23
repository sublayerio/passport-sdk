const api = require('./api')
const jwt = require('./jwt')

module.exports = ctx => async ({ refresh_token: code }) => {

    console.log('code', code)

    const response = await api.request({
        method: 'post',
        url: '/refresh-token/create',
        data: {
            code
        }
    })

    const { refresh_token, access_token } = response.data.data

    const decoded = jwt.decode(access_token)

    if (['vincent@wedouble.nl', 'joost@lesautodeal.nl', 'olivier@andev.nl'].includes(decoded.email) === false) {
        throw new Error('not authorized')
    }

    ctx.res.cookie('refresh_token', refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    })

    return {
        access_token
    }
}