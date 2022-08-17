require("dotenv").config()
const DATABASE_NAME = process.env.DATABASE_NAME
const WORK = "work"
const SKILL = "skill"
const CERTIFICATE = "certificate"
const PROJECT = "project"
const USER = "user"

module.exports = {
    WORK,
    SKILL,
    CERTIFICATE,
    PROJECT,
    DATABASE_NAME,
    USER
}