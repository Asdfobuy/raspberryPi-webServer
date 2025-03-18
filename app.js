const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// API to list images from the "public/images" folder
app.get('/list-images', (req, res) => {
  const imgDir = path.join(__dirname, 'public/images');

  fs.readdir(imgDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read images' });
    }
    const imageUrls = files.map(file => `/images/${file}`);
    res.json(imageUrls);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});