const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Use environment variable or default to port 3000
const port = process.env.PORT || 3000; 

app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.static(path.join(__dirname, 'public')));

app.get('/in', function (req,res, next) {
  res.render('home');
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
  
