require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const workRoute = require("./routes/work")
const certificateRoute = require("./routes/certificate")
const projectRoute = require("./routes/project")
const skillRoute = require("./routes/skill")

const {WORK_BASE_PATH, CERTIFICATE_BASE_PATH, SKILL_BASE_PATH, PROJECT_BASE_PATH} = require("./constant/path")
const { sendNotFoundError } = require("./response")

const port = process.env.PORT

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(WORK_BASE_PATH, workRoute)
app.use(CERTIFICATE_BASE_PATH, certificateRoute)
app.use(PROJECT_BASE_PATH, projectRoute)
app.use(SKILL_BASE_PATH, skillRoute)


app.get("*", (req, res) => {
    return res.status(404).send(sendNotFoundError())
})
app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})