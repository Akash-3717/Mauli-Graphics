const getJwtSecret = () => {
    const secret = process.env.ADMIN_JWT_SECRET;

    if (!secret) {
        throw new Error('ADMIN_JWT_SECRET is not configured');
    }

    return secret;
};

module.exports = { getJwtSecret };