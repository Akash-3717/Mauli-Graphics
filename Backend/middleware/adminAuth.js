const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');

const getJwtSecret = () => process.env.ADMIN_JWT_SECRET || 'change-this-admin-secret';

exports.requireAdminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, getJwtSecret());

        const admin = await Admin.findById(decoded.id).select('-password');
        if (!admin) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
};