const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const timeout = require('connect-timeout')
require('dotenv').config();

app.use(morgan('combined'));

const spellsUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;
mongoose.connect(spellsUri, 
  { useNewUrlParser: true }
);

var port = process.env.PORT || 3000;

const authController = require('./controllers/authController');
const index = require('./routes/index');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const spellsDeck = require('./routes/spell');
const classRoute = require('./routes/class');


//TODO: BOTAR A VALIDAÇÃO NO VERIFY
// app.use('/api/spell', authController.verifyToken);
// app.use('/api/user', authController.verifyToken);

app.use(cors());
app.use(timeout('10s'))
app.use(bodyParser.json());
app.use(haltOnTimedout)

app.use('/', index);
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', spellsDeck);
app.use('/api', classRoute);

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

app.listen(port, () => {
    console.log('Listen to port 3000')
});