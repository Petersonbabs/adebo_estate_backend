const dotEnv = require("dotenv")
dotEnv.config()

const handleDupError = (err)=>{
    const dupKey = Object.keys(err.keyValue)[0]
    const dupValue = Object.values(err.keyValue)[0]
    const message = `${dupKey} of ${dupValue} already exists!`
    const error = new Error(message)
    error.statusCode = 400
    return error
}

const handleCastError = (err)=>{
    
}

const handleValidationError = (err)=>{

}

const ProdError = (err, res)=>{
    
    // DUPLICATE
    if(err.code == 11000){
        const error = handleDupError(err)
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })
    }

    // CAST ERROR
    if(err.name == 'castError'){
        const error = handleCastError(err)
        res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    // VALIDATYION ERROR
    if(err.name == "validationErro"){
        const error = handleValidationError(err)
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })
    }

}

const devError = (err, res)=>{

}

const errorHandler = (err, req, res, next)=>{
    if(process.env.NODE_ENV == "development"){
        devError(err, res)
    } else{
        ProdError(err, res)
    }
    next()
}

module.exports = errorHandler