const express = require('express');
const app = express()
const log = require('./middleware/logger');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const courses = require('./routes/courses');
const home = require('./routes/home');
const startupDebugger = require('debug')("app:startup");
const dbDebugger = require('debug')("app:db");

app.use( express.json());

app.use(log) // custom middleware

app.use(express.json())

app.use(express.urlencoded({ extended : true })) //form -urlencoded

app.use(express.static('public'));

if(app.get('env') == 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled-->')
    startupDebugger('Morgan Enabled');
}

dbDebugger('DB connected');

app.use(helmet());

//console.log('Application ' + config.get('name'));
//console.log('host ' + config.get('mail.host'));
//console.log('password ' + config.get('mail.password'));

app.use('/',home);
app.use('/api/courses',courses);

const port = process.env.port || 3002;
app.listen(port,() => { console.log(`Listen at ${port} Port`)})