const express = require('express');
const mongoose = require('mongoose');
//console.log('Path of file in parent dir:', require('path').resolve(__dirname, './route/usersRoutes'));
const usersRouter = require('./route/usersRoutes');
const carsRouter = require('./route/carsRoutes');
const garagesRouter = require('./route/garagesRoutes');
const adminsRouter = require('./route/adminsRoutes');
const passesRouter  = require('./route/passesRoutes')

const app = express();

const cors = require('cors');
//app.options('*', cors());

app.use(cors());
app.use(express.json());
app.use(usersRouter);
app.use(carsRouter);
app.use(garagesRouter);
app.use(adminsRouter);
app.use(passesRouter);

mongoose.connect('mongodb://127.0.0.1:27017/knowYourGarage').then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log(err);
});

app.listen(3000, () => {
    console.log(`Server listening on port ${3000}`);
});