const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, 'html', 'about.html'));
// });
app.listen(8000, () => {
  console.log('Express App on port 8000!');
});