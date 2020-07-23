const axios = require('axios')
const encodeBase64 = require('./encodeBase64')

module.exports = axios.create({
    baseURL: process.env.SUBLAYER_PASSPORT_API_URL,
    headers: {
        Authorization: 'Bearer ' + encodeBase64(process.env.SUBLAYER_PASSPORT_CLIENT_ID + ':' + process.env.SUBLAYER_PASSPORT_CLIENT_SECRET)
    }
})