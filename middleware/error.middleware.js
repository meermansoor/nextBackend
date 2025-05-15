// Error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log error for debugging
    console.error('Error:', {
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    // Default error status and message
    let statusCode = err.status || err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        // Mongoose validation error
        statusCode = 400;
        message = Object.values(err.errors).map(error => error.message).join(', ');
    } else if (err.name === 'CastError') {
        // Mongoose casting error (invalid ObjectId etc)
        statusCode = 400;
        message = 'Invalid resource ID';
    } else if (err.code === 11000) {
        // MongoDB duplicate key error
        statusCode = 409;
        message = 'Duplicate field value entered';
    } else if (err.name === 'JsonWebTokenError') {
        // JWT validation errors
        statusCode = 401;
        message = 'Invalid token';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        errors: err.errors || undefined
    });
};

// Handle unhandled promise rejections
const unhandledRejectionHandler = (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Log to monitoring service or take other actions as needed
};

// Handle uncaught exceptions
const uncaughtExceptionHandler = (error) => {
    console.error('Uncaught Exception:', error);
    // Log to monitoring service or take other actions as needed
    process.exit(1);
};

// Attach handlers
process.on('unhandledRejection', unhandledRejectionHandler);
process.on('uncaughtException', uncaughtExceptionHandler);

export { errorHandler, unhandledRejectionHandler, uncaughtExceptionHandler };


