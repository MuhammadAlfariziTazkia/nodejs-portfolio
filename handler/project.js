const { ObjectId } = require("mongodb")
const { PROJECT, DATABASE_NAME } = require("../constant/database")
const { TRANSACTION_SUCCESS, TRANSACTION_FAILED, CONNECTION_FAILED } = require("../constant/message")
const { DELETE, UPDATE, INSERT, FETCH_ALL } = require("../constant/transaction")
const { client } = require("../database")
const { sendSuccessResponse, sendInternalServerError } = require("../response")

const getAllProjects = (req, res) => {
    client.connect(async (error, dbCursor) => {

        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        const db = dbCursor.db(DATABASE_NAME)

        await db.collection(PROJECT).find().toArray((error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(FETCH_ALL, PROJECT, error)))
            }
            dbCursor.close()
            return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(FETCH_ALL, PROJECT), result))
        })

    })
}

const addProject = (req, res) => {
    const {name, start_month, end_month, position, link} = req.body

    client.connect(async (error, dbCursor) => {

        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        const db = dbCursor.db(DATABASE_NAME)

        await db.collection(PROJECT).insertOne({
            name, start_month, end_month, position, link
        },
            (error, result) => {
                if (error) {
                    return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(INSERT, PROJECT, error)))
                }
                dbCursor.close()
                return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(INSERT, PROJECT), result))
            }
        )
    })
}

const updateProject = (req, res) => {
    const { id } = req.params
    const {name, start_month, end_month, position, link} = req.body

    client.connect(async (error, dbCursor) => {
        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        var db = dbCursor.db(DATABASE_NAME)
        var condition = { _id: ObjectId(id) }
        var newvalues = {
            $set: {
                name, start_month, end_month, position, link
            }
        }

        await db.collection(PROJECT).updateOne(condition, newvalues, (error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(UPDATE, PROJECT, error)))
            }
            dbCursor.close()
            return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(UPDATE, PROJECT), result))
        })
    })
}

const deleteProject = (req, res) => {
    const { id } = req.params
    client.connect(async (error, dbCursor) => {
        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }
        var db = dbCursor.db(DATABASE_NAME)
        var condition = { _id: ObjectId(id) }
        await db.collection(PROJECT).deleteOne(condition, (error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(DELETE, PROJECT, error)))
            }
            dbCursor.close()
            return res.send(sendSuccessResponse(TRANSACTION_SUCCESS(DELETE, PROJECT), result))
        })
    })

}

module.exports = {
    getAllProjects,
    addProject,
    updateProject,
    deleteProject
}
