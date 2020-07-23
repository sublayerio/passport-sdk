const express = require('express')
const bodyParser = require('body-parser')
const clearSession = require('./clearSession')
const createSession = require('./createSession')
const refreshSession = require('./refreshSession')
const handle = require('./handle')
const cookieParser = require('cookie-parser')

const app = express()

app.post('/session/logout', bodyParser.json(), cookieParser(), handle(clearSession))
app.post('/session/create', bodyParser.json(), cookieParser(), handle(createSession))
app.post('/session/refresh', bodyParser.json(), cookieParser(), handle(refreshSession))

module.exports = app