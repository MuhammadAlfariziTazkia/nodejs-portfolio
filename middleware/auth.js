const { JsonWebTokenError } = require("jsonwebtoken")
const { DATABASE_NAME, USER } = require("../constant/database")
const { client } = require("../database")
const { access_secret_token, jsonWebToken } = require("../auth-helper")
const { sendBadRequestResponse, sendUnauthorizedRequest } = require("../response")

const allAccessAuthorization = async (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if (!token){
        return res.status(400).send(sendBadRequestResponse("Token invalid"))
    }

    try {
        let payload = jsonWebToken.verify(token, access_secret_token)

        client.connect(async (error, dbCursor) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
            }
            let db = dbCursor.db(DATABASE_NAME);
            await db.collection(USER).findOne({username: payload.username}, (error, result) => {
              if (error) {
                  return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(error)))
              }
              dbCursor.close();
              console.log(result)
              if (result.role == 'Admin') {
                  next()
              } else {
                  console.log("masuk sini")
                  return res.status(401).send(sendUnauthorizedRequest())
              }
            });
          });      
    } catch (error) {
        if (error instanceof JsonWebTokenError){
            return res.status(401).send(sendUnauthorizedRequest())
        }
    }
}


const readOnlyAccessAuthorization = async (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if (!token){
        return res.status(400).send(sendBadRequestResponse("Token invalid"))
    }

    try {
        let payload = jsonWebToken.verify(token, access_secret_token)

        client.connect(async (error, dbCursor) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
            }
            let db = dbCursor.db(DATABASE_NAME);
            await db.collection(USER).findOne({username: payload.username}, (error, result) => {
              if (error) {
                  return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(error)))
              }
              dbCursor.close();
              console.log(result)
              if (result.role == 'User' || result.role == 'Admin') {
                  next()
              } else {
                  console.log("masuk sini")
                  return res.status(401).send(sendUnauthorizedRequest())
              }
            });
          });      
    } catch (error) {
        if (error instanceof JsonWebTokenError){
            return res.status(401).send(sendUnauthorizedRequest())
        }
    }
}

module.exports = {
    allAccessAuthorization,
    readOnlyAccessAuthorization
}