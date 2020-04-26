const express = require('express');
const app = express();
const db = require('./db');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/order', (req, res) => {
  // console.log(req.body);
  // console.log('Inside server post handler => ', req.body);
  // let orderData = JSON.stringify(req.body);
  // orderData = JSON.parse(orderData);
  // console.log('Stringified => ', orderData);

  if (req.body.hasOwnProperty('_id')) {
    db.updateOrder(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    })
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

