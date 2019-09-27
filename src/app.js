const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
// const MongoClient = require('mongodb').MongoClient;


const extendTimeoutMiddleware = (req, res, next) => {
  const space = ' ';
  let isFinished = false;
  let isDataSent = false;

  // Only extend the timeout for API requests
  if (!req.url.includes('/api')) {
    next();
    return;
  }

  res.once('finish', () => {
    isFinished = true;
  });

  res.once('end', () => {
    isFinished = true;
  });

  res.once('close', () => {
    isFinished = true;
  });

  res.on('data', (data) => {
    // Look for something other than our blank space to indicate that real
    // data is now being sent back to the client.
    if (data !== space) {
      isDataSent = true;
    }
  });

  const waitAndSend = () => {
    setTimeout(() => {
      // If the response hasn't finished and hasn't sent any data back....
      if (!isFinished && !isDataSent) {
        // Need to write the status code/headers if they haven't been sent yet.
        if (!res.headersSent) {
          res.writeHead(202);
        }

        res.write(space);

        // Wait another 15 seconds
        waitAndSend();
      }
    }, 15000);
  };

  waitAndSend();
  next();
};


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
app.use('/api/spell', authController.verifyToken);

app.use(bodyParser.json());

app.use('/', index);
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', spellsDeck);
app.use(extendTimeoutMiddleware);


app.listen(port, () => {
    console.log('Listen to port 3000')
});