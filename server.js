const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Use environment variable or default to port 3000
const port = process.env.PORT || 3000; 

app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', "home.html"));
})

app.get('/images', (req, res) => {
  res.send('Images!')
})

app.use(express.static(path.join(__dirname, 'public')));

app.get('/in', function (req,res, next) {
  res.render('home');
})

 app.listen(port, '0.0.0.0', () => {
   console.log(`Server listening on http://0.0.0.0:${port}`);
 });

/* app.listen(port, () => {
  
}); */


  
