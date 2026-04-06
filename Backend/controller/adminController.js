const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');

const getJwtSecret = () => process.env.ADMIN_JWT_SECRET || 'change-this-admin-secret';

const buildToken = (adminId) => {
    return jwt.sign({ id: adminId }, getJwtSecret(), { expiresIn: '7d' });
};

exports.setupAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            return res.status(403).json({ message: 'Admin setup is already completed' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const admin = await Admin.create({
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        const token = buildToken(admin._id.toString());

        return res.status(201).json({
            message: 'Admin account created successfully',
            token,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = buildToken(admin._id.toString());

        return res.status(200).json({
            message: 'Admin login successful',
            token,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getCurrentAdmin = async (req, res, next) => {
    try {
        return res.status(200).json({
            admin: {
                id: req.admin._id,
                email: req.admin.email,
            },
        });
    } catch (err) {
        next(err);
    }
};