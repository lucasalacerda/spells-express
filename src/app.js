const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan')

app.use(morgan('combined'))

const spellsDB = 'mongodb+srv://lucasalacerda:7894512@spells-mxwh5.gcp.mongodb.net/spellsdb?retryWrites=true&w=majority';
mongoose.connect(spellsDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var port = process.env.PORT || 3000;

const index = require('./routes/index');
const spellsDeck = require('./routes/spellsDeck');

app.use('/', index);
app.use('/api', index);
app.use('/api/spellsDeck', spellsDeck);

app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Listen to port 3000')
});