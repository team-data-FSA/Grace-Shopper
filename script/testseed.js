const fs = require('fs');

fs.readFile('./script/seedoutput.js', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(JSON.parse(data));
});
