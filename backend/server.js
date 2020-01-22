const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userRouter = require('./controllers/UserController/UserController');
const roleRouter = require('./controllers/RoleController/RoleController');
const cors = require('cors')

const jsonParser = express.json();
const pool = require('./module/db-config');
var bodyParser = require('body-parser');

// Setting up port with express js
//const userRoute = require('../backend/routes/user.route')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(express.static(path.join(__dirname, 'dist/my-angular-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/my-angular-crud-app')));
app.use('/api/user', userRouter)
app.use('/api/role', roleRouter)

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(req, res);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(`server error:${err.message}`); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
  next();
});

// Create port
const port = process.env.PORT || 4005;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
