const CONNECTION_FAILED = (error) => {
    `Failed to connect with database: ${error}`
}
const TRANSACTION_FAILED = (transaction_type, collection_name, error) => {
    return `Failed to ${transaction_type} data from ${collection_name}: ${error}`
}
const TRANSACTION_SUCCESS = (transaction_type, collection_name) =>{
    return `Success to ${transaction_type} data from ${collection_name} collection`
}

module.exports = {
    CONNECTION_FAILED,
    TRANSACTION_FAILED,
    TRANSACTION_SUCCESS
}