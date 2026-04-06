exports.get404 = (req, res, next) => {
    res.status(404).json({ message: 'Page Not Found' });
};

exports.handleError = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON in request body' });
    }

    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
};