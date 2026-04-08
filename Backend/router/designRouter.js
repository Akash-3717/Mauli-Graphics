const express = require('express');
const designRouter = express.Router();
const upload = require('../middleware/upload');
const designController = require('../controller/designController');
const { requireAdminAuth } = require('../middleware/adminAuth');

designRouter.post('/add', requireAdminAuth, upload.single('image'), designController.addDesign);
designRouter.get('/all', designController.getAllDesigns);
designRouter.delete('/delete/:id', requireAdminAuth, designController.deleteDesign);

module.exports = designRouter;
