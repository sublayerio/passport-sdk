const difference = require('lodash/difference')
const api = require('./api')
const jwt = require('./jwt')

module.exports = ({ roles: requiredRoles }) => ctx => async ({ refresh_token: code }) => {

    console.log('code', code)

    const response = await api.request({
        method: 'post',
        url: '/refresh-token/create',
        data: {
            code
        }
    })

    const { refresh_token, access_token, max_age } = response.data.data

    const decoded = jwt.decode(access_token)

    if (difference(requiredRoles, decoded.roles).length) {
        throw new Error('unauthorized')
    }

    ctx.res.cookie('refresh_token', refresh_token, {
        maxAge: max_age ? 7 * 24 * 60 * 60 * 1000 : null,
        httpOnly: true
    })

    return {
        access_token
    }
}