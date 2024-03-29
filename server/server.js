const express = require('express');
const compression = require('compression');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middlewares/notFound.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
// app.use(helmet());
// app.use(compression());

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE'],
		credentials: true,
	}),
);
// init db
require('./db/init.mongoose.js');
//handle error
app.use(require('./routers'));
app.use(notFound);
app.use(errorHandler);

// connect to server
app.listen(PORT, (req, res) => {
	console.log('Conect to server successfully');
});
