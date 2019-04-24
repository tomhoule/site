var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();

var port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'dist')));

console.log("starting the nyapp on http://localhost:3000")

http.createServer(app).listen(port);
