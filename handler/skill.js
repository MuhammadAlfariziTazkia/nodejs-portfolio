const { ObjectId } = require("mongodb")
const { SKILL, DATABASE_NAME } = require("../constant/database")
const { TRANSACTION_SUCCESS, TRANSACTION_FAILED, CONNECTION_FAILED } = require("../constant/message")
const { DELETE, UPDATE, INSERT, FETCH_ALL } = require("../constant/transaction")
const { client } = require("../database")
const { sendSuccessResponse, sendInternalServerError } = require("../response")

const getAllSkills = (req, res) => {
    client.connect(async (error, dbCursor) => {

        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        const db = dbCursor.db(DATABASE_NAME)

        await db.collection(SKILL).find().toArray((error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
            }

            dbCursor.close()
            return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(FETCH_ALL, SKILL), result))
        })

    })
}

const addSkill = (req, res) => {
    const { name, fluently_rate, type } = req.body

    client.connect(async (error, dbCursor) => {

        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        const db = dbCursor.db(DATABASE_NAME)

        await db.collection(SKILL).insertOne({
            name,
            fluently_rate,
            type
        },
            (error, result) => {
                if (error) {
                    return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(INSERT, SKILL, Error)))
                }
                dbCursor.close()
                return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(INSERT, SKILL), result))
            }
        )
    })
}

const updateSkill = (req, res) => {
    const { id } = req.params
    const { name, fluently_rate, type } = req.body

    client.connect(async (error, dbCursor) => {
        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        var db = dbCursor.db(DATABASE_NAME)
        var condition = { _id: ObjectId(id) }
        var newvalues = {
            $set: {
                name,
                fluently_rate,
                type
            }
        }

        await db.collection(SKILL).updateOne(condition, newvalues, (error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(UPDATE, SKILL, error)))
            }
            dbCursor.close()
            return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(UPDATE, SKILL), result))
        })
    })
}

const deleteSkill = (req, res) => {
    const { id } = req.params
    client.connect(async (error, dbCursor) => {
        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }
        var db = dbCursor.db(DATABASE_NAME)
        var condition = { _id: ObjectId(id) }
        await db.collection(SKILL).deleteOne(condition, (error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(DELETE, SKILL, error)))
            }
            dbCursor.close()
            return res.send(sendSuccessResponse(TRANSACTION_SUCCESS(DELETE, SKILL), result))
        })
    })

}

module.exports = {
    getAllSkills,
    addSkill,
    updateSkill,
    deleteSkill
}
