const errorMiddleware = (err, req, res, next) => {
    try{
        let error = { ...err };
        error.message = err.message;
        //However, the above two lines are unnecessary because, in the latter part of the code, we directly modify the err object instead of using a separate error variable.

        console.error(err);

        //Mongoose bad ObjectID
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key
        if (error.code === 11000) {
            const message = 'Duplicate filed value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        //Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' });
    }
    catch(error){
        next(error);
    }
};

export default errorMiddleware;