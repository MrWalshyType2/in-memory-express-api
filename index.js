const express = require('express');
const morgan = require('morgan');
const versionOneRouter = require('./api/v1/route/version-one-router');

const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
    console.log("=== PRODUCTION | INACTIVE ===");
    app.use(morgan('dev'));
} else {
    console.log("=== PRODUCTION | ACTIVE ===");
}

// Built-in middleware
app.use(express.json());

// Router level middleware
app.use("/v1", versionOneRouter);

// Error handling middleware
app.use((error, request, response, next) => {
    console.error(error.message);

    if (!error.statusCode) error.statusCode = 500;

    return response.status(error.statusCode).json({
        message: error.message || 'Something went wrong...'
    });
});

// Start the server
const server = app.listen(PORT, function () {
    console.log(`Server up on ${PORT}`);
});
