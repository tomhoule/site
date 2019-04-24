var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();

app.use(express.static(path.join(__dirname, 'dist')));

console.log("starting the nyapp on http://localhost:3000")

http.createServer(app).listen(3000);
