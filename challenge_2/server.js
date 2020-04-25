const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, './client')));

// app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api/json', (req, res) => {

  // Parse json into an object
  let obj = JSON.parse(req.body.jsonData);

  // Reformat data to be in csv format
  let headers = Object.keys(obj);
  console.log(headers);

  // Write it to a file


  // Return the csv file to the client

  res.status(200).send(obj);
})

app.listen(port, () => {
  console.log(`App listening on http://127.0.0.1:${port}`);
})