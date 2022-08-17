const { ObjectId } = require("mongodb")
const { CERTIFICATE, DATABASE_NAME } = require("../constant/database")
const { CONNECTION_FAILED, TRANSACTION_FAILED, TRANSACTION_SUCCESS } = require("../constant/message")
const { FETCH_ALL, UPDATE, DELETE } = require("../constant/transaction")
const { client } = require("../database")
const { sendSuccessResponse, sendInternalServerError } = require("../response")

const getAllCertificates = (req, res) => {
    client.connect(async (error, dbCursor) => {

        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        const db = dbCursor.db(DATABASE_NAME)

        await db.collection(CERTIFICATE).find().toArray((error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(FETCH_ALL, CERTIFICATE)))
            }
            dbCursor.close()
            return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(FETCH_ALL, CERTIFICATE), result))
        })

    })
}

const addCertificate = (req, res) => {
    const { name, organization_issued, field } = req.body

    client.connect(async (error, dbCursor) => {

        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        const db = dbCursor.db(DATABASE_NAME)

        await db.collection(CERTIFICATE).insertOne({
            name, organization_issued, field
        },
            (error, result) => {
                if (error) {
                    return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(FETCH_ALL, CERTIFICATE, error)))
                }
                dbCursor.close()
                return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(FETCH_ALL, CERTIFICATE), result))
            }
        )
    })
}

const updateCertificate = (req, res) => {
    const { id } = req.params
    const { name, organization_issued, field } = req.body

    client.connect(async (error, dbCursor) => {
        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        var db = dbCursor.db(DATABASE_NAME)
        var condition = { _id: ObjectId(id) }
        var newvalues = {
            $set: {
                name, organization_issued, field
            }
        }

        await db.collection(CERTIFICATE).updateOne(condition, newvalues, (error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(UPDATE, CERTIFICATE)))
            }
            dbCursor.close()
            return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(UPDATE, CERTIFICATE), result))
        })
    })
}

const deleteCertificate = (req, res) => {
    const { id } = req.params
    client.connect(async (error, dbCursor) => {
        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }
        var db = dbCursor.db(DATABASE_NAME)
        var condition = { _id: ObjectId(id) }
        await db.collection(CERTIFICATE).deleteOne(condition, (error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(DELETE, CERTIFICATE, error)))
            }
            dbCursor.close()
            return res.send(sendSuccessResponse(TRANSACTION_SUCCESS(DELETE, CERTIFICATE), result))
        })
    })

}



module.exports = {
    getAllCertificates,
    addCertificate,
    updateCertificate,
    deleteCertificate
}
