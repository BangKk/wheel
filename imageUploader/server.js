var express = require('express');
var multer = require('multer');
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now())
  }
})
var upload = multer({storage: storage})

var app = express();
app.use(express.static('./'));

app.get('/', function (req, res) {
  res.render('index.html');
});

app.post('/imageUploader',upload.array('files',5), function(req, res){
  var files = req.files;
  var response = {
    success: 'ok',
    url: []
  };
  for (var i = 0; i< files.length; i++){
    response.url.push(files[i].path);
  }
  res.end(JSON.stringify(response));
})
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
