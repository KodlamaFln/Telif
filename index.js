const express = require('express');
const app = express();
const router = require("/home/runner/Telif/kodlar/bdfd.js")
const port = 3000;

app.use('/bdfd', router);

app.listen(port, () => {
  console.log(`Uygulama ${port} numaralı porta başarıyla bağlandı.`);
});
