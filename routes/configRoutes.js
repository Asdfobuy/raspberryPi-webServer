const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

let currentConfig = {
    shutter: '',
    iso: '',
    aperture: '',
    focus: ''
};

// POST endpoint a beállítások frissítésére
router.post('/set-config', (req, res) => {
    const { shutter, iso, aperture, focus } = req.body;

    if (shutter) {
        exec(`gphoto2 --set-config shutterspeed=${shutter}`, (err) => {
            if (err) console.error('Shutter beállítás hiba:', err);
        });
    }

    if (iso) {
        exec(`gphoto2 --set-config iso=${iso}`, (err) => {
            if (err) console.error('ISO beállítás hiba:', err);
        });
    }

    if (aperture) {
        exec(`gphoto2 --set-config aperture=${aperture}`, (err) => {
            if (err) console.error('Aperture beállítás hiba:', err);
        });
    }

    if (focus) {
        const focusVal = focus === 'auto' ? 1 : 0;
        exec(`gphoto2 --set-config focusmode=${focusVal}`, (err) => {
            if (err) console.error('Fókusz beállítás hiba:', err);
        });
    }

    currentConfig = { shutter, iso, aperture, focus };

    res.json({ message: 'Beállítások frissítve!' });
});

// GET endpoint az aktuális beállítások lekérésére
router.get('/get-config', (req, res) => {
    res.json(currentConfig);
});

module.exports = router;
