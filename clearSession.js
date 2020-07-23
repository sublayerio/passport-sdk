module.exports = ctx => async () => {

    ctx.res.cookie('refresh_token', '', {
        maxAge: 0,
        httpOnly: true
    })

    return true
}