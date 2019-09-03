const express = require('express'), app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.status(200).send({
        title: 'Hello, my comrand!'
    });
})

app.listen(3000, () => {
    console.log('Listen to porto 3000')
});