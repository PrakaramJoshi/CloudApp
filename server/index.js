var express=require('express');
var app=express();
var fs=require('fs');
var sys=require('sys');
var path = require('path');
var root_dir = path.join(__dirname, '../');
var server = require('http').Server(app);
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"-"+file.originalname)
  }
})
var upload = multer({ storage: storage })
//var upload = multer({ dest: 'uploads/' })

app.use(express.static(root_dir+'/client/'));
app.use(express.static(root_dir+'/client/app/'));

app.get('/', function (req, res) {
      console.log("http connection request...");
      res.sendFile('index.html',root_dir+'/client/app');
});
app.post('/multer', upload.single('file'), function (req, res) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.body.option);
  console.log(req.body.email);
  return res.status(204).end();
})

var port = process.env.PORT || 8080;
console.log("starting server on port : " + port)
server.listen(port);
