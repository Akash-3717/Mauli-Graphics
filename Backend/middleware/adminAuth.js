const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');
const { getJwtSecret } = require('../service/jwtSecret');

exports.requireAdminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);

        if (!tokenMatch) {
            return res.status(401).json({ message: 'Authorization token must use Bearer format' });
        }

        const token = tokenMatch[1].trim();
        const decoded = jwt.verify(token, getJwtSecret());

        const admin = await Admin.findById(decoded.id).select('-password');
        if (!admin) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        if (err.message === 'ADMIN_JWT_SECRET is not configured') {
            return res.status(500).json({ message: err.message });
        }

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        return res.status(401).json({ message: 'Unauthorized access' });
    }
};