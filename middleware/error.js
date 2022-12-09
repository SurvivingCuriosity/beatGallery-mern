const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    console.log('en error handler');
    console.log(err);
    let error = {...err};
    error.message = err.message;
    
    //aqui puedo crear mas errores
    if(err.code === 11000){
        const message = 'Duplicate field values entered';
        error = new ErrorResponse(message, 400);
    }
    
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val=>{val.message});
        error = new ErrorResponse(message, 400);
    }

    res.status(error.status || 500).json({
        success: false,
        error: error.message || 'Server unknown Error'
    })

    next(error);
}

module.exports = errorHandler;