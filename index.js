'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8888;

app.use(express.static('static'));
app.use(bodyParser.json({ type: 'application/json' }));

// app.post('/', (req, res) => {

// });

app.listen(port, () => console.log(`Hikoo Checkin App on http://localhost:${port}`));