const debug = require('./debug')
const api = require('./api')

module.exports = ctx => async () => {

    const { refresh_token } = ctx.req.cookies
    
    if (!refresh_token) {
        throw new Error('no refresh token in cookies')
    }

    debug('refresh session for refresh_token', refresh_token)

    const response = await api.request({
        method: 'post',
        url: '/access-token/create',
        data: {
            refresh_token
        }
    })

    const { access_token } = response.data.data

    return {
        access_token
    }
}