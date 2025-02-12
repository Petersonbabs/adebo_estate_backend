const dotEnv = require("dotenv")
dotEnv.config()

const handleDupError = (err)=>{
  const dupKey = Object.keys(err.keyValue)[0];
  const dupValue = Object.values(err.keyValue)[0];
  const message = `${dupKey} of ${dupValue} already exists`;
  const error = new Error(message);
  error.statusCode = 400
  return error
}

const handleCastError = (err)=>{
    const message = `Invalid ${err.path}: ${err.value}`
    const error = new Error(message);
    error.statusCode = 400
    return error
}

const handleValidationError = (err)=>{
    let message
    const errValue = Object.values(err.errors).map(error => error.value);
    const errKey = Object.keys(err.errors).map(error => error.path)
    const errKind = Object.values(err.errors).map(error => error.kind)
    if (errKind == 'required') {
        message = `Please provide a ${errKey}`
    } else {
        message = `${errValue} is an invalid ${errKey}`
    }
    const error = new Error(message);
    error.statusCode = 400;
    return error
}

const handleNetworkError = (err)=>{
    const message = 'Mongo network error'
    const error = new Error(message)
    return error
}

const ProdError = (err, res)=>{

    if(err.code == "ETIMEOUT"){
        const error = handleNetworkError(err)
        res.status(400).json({
            message: error.message
        })
    }
    
    // DUPLICATE
    if(err.code == 11000){
        const error = handleDupError(err)
        res.status(error.statusCode).json({
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