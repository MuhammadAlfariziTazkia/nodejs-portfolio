const { SUCCESS, BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR, NOT_FOUND } = require("./constant/status")

const sendSuccessResponse = (message, data) => {
    return {
        "code": 200,
        "status": SUCCESS,
        "message": message,
        "data": data
    }
} 

const sendBadRequestResponse = (message) => {
    return {
        "code": 400,
        "status": BAD_REQUEST,
        "message": message
    }
}

const sendUnauthorizedRequest = () => {
    return {
        "code": 401,
        "status": UNAUTHORIZED
    }
}

const sendInternalServerError = (message) => {
    return {
        "code": 500,
        "status": INTERNAL_SERVER_ERROR,
        "message": message
    }
}

const sendNotFoundError = () => {
    return {
        "code": 404,
        "status": NOT_FOUND,
    }
}

module.exports = {
    sendSuccessResponse,
    sendBadRequestResponse,
    sendUnauthorizedRequest,
    sendInternalServerError,
    sendNotFoundError
}