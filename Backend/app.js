const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${ENV}` });

// External Module
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//Local Module
const errorController = require('./controller/errorcontroller');
const designRouter = require('./router/designRouter');
const adminRouter = require('./router/adminRouter');
const { default: mongoose } = require('mongoose');

const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@akash.nnixybo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;


const app = express();

// Trust proxy to get correct protocol/host headers
app.set('trust proxy', 1);

// Configure CORS with proper headers for image loading
app.use(cors({
	origin: true,
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/design", designRouter);
app.use('/admin', adminRouter);
app.use(errorController.get404);
app.use(errorController.handleError);


const PORT = process.env.PORT || 3003;
mongoose.connect(MONGO_DB_URL).then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
})
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });