const express = require('express'), app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/spells';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const index = require('./routes/index');
const spellsDeck = require('./routes/spellsDeck');

app.use('/', index);
app.use('/api', index);
app.use('/api/spellsDeck', spellsDeck);

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Listen to porto 3000')
});