const express = require('express');
const app = express();

app.use(express.static('public'));


const port = process.env.PORT || 1235;
app.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
})

