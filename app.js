const express = require('express');
const fs = require('fs');
const path = require('path');
const configRoutes = require('./routes/configRoutes');

const app = express();
const port = process.env.PORT || 3000;



// Serve static files from the "public" folder
app.use(express.static('public'));
app.use(express.json());

app.use('/', configRoutes);

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

// 🔹 API for downloading an image
app.get('/download-image/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'public/images', req.params.filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// 🔹 API for deleting an image
app.delete('/delete-image/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'public/images', req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting file' });
    }
    res.json({ success: true, message: 'File deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})

const { exec } = require('child_process');

app.use(express.json());


