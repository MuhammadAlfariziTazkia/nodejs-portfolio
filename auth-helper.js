const { JsonWebTokenError } = require("jsonwebtoken")
const jsonWebToken = require("jsonwebtoken")
const { client } = require("./database")
const { sendUnauthorizedRequest, sendBadRequestResponse } = require("./response")

const jwtExpiredSeconds = 300
const jwtExpiredMills = jwtExpiredSeconds * 1000
const access_secret_token = process.env.ACCESS_SECRET_TOKEN

const generateToken = (username) => {
    const token = jsonWebToken.sign(
        { username: username },
        access_secret_token,
        {
            algorithm: "HS256",
            expiresIn: jwtExpiredSeconds
        }
    )
    
    return token
}


module.exports = {
    generateToken,
    jwtExpiredSeconds,
    access_secret_token,
    jwtExpiredMills,
    jsonWebToken
}