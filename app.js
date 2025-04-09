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

app.post('/set-config', (req, res) => {
  const { shutter, iso, aperture } = req.body;

  const cmds = [];

  if (shutter) {
    cmds.push(`gphoto2 --set-config /main/capturesettings/shutterspeed=${shutter}`);
  }

  if (iso) {
    cmds.push(`gphoto2 --set-config /main/imgsettings/iso=${iso}`);
  }

  if (aperture) {
    cmds.push(`gphoto2 --set-config /main/capturesettings/aperture=${aperture}`);
  }

  // Sorban végrehajtjuk őket
  exec(cmds.join(' && '), (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', stderr);
      return res.status(500).json({ message: 'Hiba történt: ' + stderr });
    }
    res.json({ message: 'Beállítások sikeresen alkalmazva!' });
  });
});
