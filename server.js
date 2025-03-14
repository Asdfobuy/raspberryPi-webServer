const express = require('express');
const app = express();

// Use environment variable or default to port 3000
const port = process.env.PORT || 3000; 

app.use(express.urlencoded({ extended: true}))

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
  
