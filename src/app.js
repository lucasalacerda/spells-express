const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const timeout = require('connect-timeout')
const conf = require('../conf');

app.use(morgan('combined'))

const spellsUri = `mongodb+srv://${conf.mongo.username}:${conf.mongo.password}@${conf.mongo.url}`;
mongoose.connect(spellsUri, 
  { useNewUrlParser: true }
);

var port = process.env.PORT || 3000;

const authController = require('./controllers/authController');
const index = require('./routes/index');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const spellsDeck = require('./routes/spellsDeck');

//TODO: BOTAR A VALIDAÇÃO NO VERIFY
app.use('/api/spell', authController.verifyToken);
app.use('/api/user', authController.verifyToken);

app.use(timeout('10s'))
app.use(bodyParser.json());
app.use(haltOnTimedout)

app.use('/', index);
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', spellsDeck);

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

app.listen(port, () => {
    console.log('Listen to port 3000')
});