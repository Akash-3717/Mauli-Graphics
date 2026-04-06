const express = require('express');
const designRouter = express.Router();
const upload = require('../middleware/upload');
const designController = require('../controller/designController');

designRouter.post('/add', upload.single('image'), designController.addDesign);
designRouter.get('/all', designController.getAllDesigns);
designRouter.delete('/delete/:id', designController.deleteDesign);

module.exports = designRouter;
