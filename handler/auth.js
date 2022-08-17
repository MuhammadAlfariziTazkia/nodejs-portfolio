const { ObjectId } = require("mongodb")
const { CERTIFICATE, DATABASE_NAME, USER } = require("../constant/database")
const { CONNECTION_FAILED, TRANSACTION_FAILED, TRANSACTION_SUCCESS } = require("../constant/message")
const { LOGIN } = require("../constant/transaction")
const { client } = require("../database")
const { generateToken, jwtExpiredMills } = require("../auth-helper")
const { sendSuccessResponse, sendInternalServerError, sendUnauthorizedRequest } = require("../response")

const login = (req, res) => {
    const { username, password } = req.body

    client.connect((error, dbCursor) => {
        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }
        let db = dbCursor.db(DATABASE_NAME);
        db.collection(USER).findOne({ username: username }, function (error, result) {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(error)))
            }
            dbCursor.close();

            if (result.password != password) {
                return res.status(401).send(sendUnauthorizedRequest())
            }

            const token = generateToken(username)

            res.cookie("token", token, {
                maxAge: jwtExpiredMills
            })

            return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(LOGIN, USER), token))
        });
    });
}


module.exports = {
    login
}
