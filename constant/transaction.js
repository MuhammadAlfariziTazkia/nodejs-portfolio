const INSERT = "Insert"
const FETCH_ALL = "Fetch All"
const UPDATE = "Update"
const DELETE = "Delete"
const FETCH_BY = (field) => {
    return `Fetch By ${field}`
}
const LOGIN = "Login"

module.exports = {
    INSERT,
    FETCH_ALL,
    UPDATE,
    DELETE,
    FETCH_BY,
    LOGIN
}