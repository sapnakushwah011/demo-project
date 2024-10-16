const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle any other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port =  3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});