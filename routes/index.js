const app = require('express').Router();
const apiRoutes = require('./apiRoutes'); 
const htmlRoutes = require('./htmlRoutes');

app.use('/', htmlRoutes)
app.use('/api/', apiRoutes)

module.exports = app;