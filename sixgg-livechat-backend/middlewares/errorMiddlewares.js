const errorHandler = (error, req, res, next) => {
    error.message ||= "Internal Server Error"
    error.statusCode ||= 500
    return res.status(error.statusCode).json({
        status: false,
        message: error.message
    })
}

module.exports = {errorHandler}