const { ObjectId } = require("mongodb")
const { WORK, DATABASE_NAME } = require("../constant/database")
const { CONNECTION_FAILED, TRANSACTION_SUCCESS, TRANSACTION_FAILED } = require("../constant/message")
const { INSERT, DELETE, UPDATE, FETCH_ALL } = require("../constant/transaction")
const { client } = require("../database")
const { sendSuccessResponse, sendInternalServerError } = require("../response")

const getAllWorks = (req, res) => {
    client.connect(async (error, dbCursor) => {

        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        const db = dbCursor.db(DATABASE_NAME)

        await db.collection(WORK).find().toArray((error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(FETCH_ALL, WORK, error)))
            }
            dbCursor.close()
            return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(FETCH_ALL, WORK), result))
        })

    })
}

const addWork = (req, res) => {
    const { company, position, start_month, end_month, type } = req.body

    client.connect(async (error, dbCursor) => {

        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        const db = dbCursor.db(DATABASE_NAME)

        await db.collection(WORK).insertOne({
            company,
            position,
            start_month,
            end_month,
            type
        },
            (error, result) => {
                if (error) {
                    return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(INSERT, WORK, error)))
                }
                dbCursor.close()
                return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(INSERT, WORK), result))
            }
        )
    })
}

const updateWork = (req, res) => {
    const { id } = req.params
    const { company, position, start_month, end_month, type } = req.body

    client.connect(async (error, dbCursor) => {
        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }

        var db = dbCursor.db(DATABASE_NAME)
        var condition = { _id: ObjectId(id) }
        var newvalues = {
            $set: {
                company,
                position,
                start_month,
                end_month,
                type
            }
        }

        await db.collection(WORK).updateOne(condition, newvalues, (error, result) => {
            if (error) {
                return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(UPDATE, WORK, error)))
            }
            dbCursor.close()
            return res.status(200).send(sendSuccessResponse(TRANSACTION_SUCCESS(UPDATE, WORK), result))
        })
    })
}

const deleteWork = (req, res) => {
    const {id} = req.params
    client.connect(async (error, dbCursor) => {
        if (error) {
            return res.status(500).send(sendInternalServerError(CONNECTION_FAILED(error)))
        }
        var db = dbCursor.db(DATABASE_NAME)
        var condition = { _id: ObjectId(id) }
        await db.collection(WORK).deleteOne(condition, (error, result) => {
          if (error) {
              return res.status(500).send(sendInternalServerError(TRANSACTION_FAILED(DELETE, WORK, error)))
          }
          dbCursor.close()
          return res.send(sendSuccessResponse(TRANSACTION_SUCCESS(DELETE, WORK), result))
        })
      })
      
}

module.exports = {
    getAllWorks,
    addWork,
    updateWork,
    deleteWork
}
