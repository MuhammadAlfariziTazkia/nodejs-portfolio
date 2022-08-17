require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb')

const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD

const uri = `mongodb+srv://${username}:${password}@cluster0.njwpckn.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

module.exports = {
    client
}
