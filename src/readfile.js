const fs = require("fs");

fs.readdir("./", function (err, archivos) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(archivos);
});
