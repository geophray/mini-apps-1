const express = require('express');
const app = express();
const db = require('./db');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/order', (req, res) => {
  console.log(req.body);

  if (req.body.hasOwnProperty('_id')) {
    console.log('ID exists!');
  } else {
    db.create(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).send(result);
    });
  }

});


const port = process.env.PORT || 1235;
app.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
})

