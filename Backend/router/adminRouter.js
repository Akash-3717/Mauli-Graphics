const express = require('express');
const adminRouter = express.Router();

const adminController = require('../controller/adminController');
const { requireAdminAuth } = require('../middleware/adminAuth');

adminRouter.post('/setup', adminController.setupAdmin);
adminRouter.post('/login', adminController.loginAdmin);
adminRouter.get('/me', requireAdminAuth, adminController.getCurrentAdmin);

module.exports = adminRouter;