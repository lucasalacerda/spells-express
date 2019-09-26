const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
// const MongoClient = require('mongodb').MongoClient;


app.use(morgan('combined'))

const spellsUri = 'mongodb+srv://lucasalacerda:7894512@spells-mxwh5.gcp.mongodb.net/spellsdb?retryWrites=true&w=majority';
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
// app.use('/api/spell', authController.verifyToken);

app.use(bodyParser.json());

app.use('/', index);
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', spellsDeck);


app.listen(port, () => {
    console.log('Listen to port 3000')
});