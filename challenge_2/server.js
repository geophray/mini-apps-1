const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, './client')));

// app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api/json', (req, res) => {
  console.log('Here is the body of the doc: ', req.body);
  res.status(200).send("Success!");
})

app.listen(port, () => {
  console.log(`App listening on http://127.0.0.1:${port}`);
})