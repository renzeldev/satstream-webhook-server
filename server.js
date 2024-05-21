//Install express server
const express = require('express');
var fs = require('fs');
var https = require('https');
var bodyParser = require("body-parser");
const path = require('path');
var cors = require('cors');

const app = express();

const socketIo = require('socket.io');

app.use(bodyParser.json());

// Serve only the static files form the dist directory
app.use(cors());
app.use(function (req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var options = {
  key: fs.readFileSync('./file.pem'),
  cert: fs.readFileSync('./file.crt'),
  requestCert: true,
  rejectUnauthorized: false
};
const server = https.createServer(options,app);
const io = socketIo(server, {
  cors: {
    origins: ['*']
  }
});
app.set('socketIo', io);
io.on('connection', (socket) => {
  socket.peerCertificate = rawSocket.request.client.getPeerCertificate();
  // Handle the webhook event and broadcast it to connected clients
  // socket.on('StreamNotification', (data) => {
    
  // });

  //io.emit('StreamNotification', data);
  // router.get('/test', async (req, res) => {
  //   io.emit('TestNotification', {StreamId: 1});
  // })
});

var webhookRouter = require('./webhook');
app.use('/webhook', webhookRouter);
module.exports = app;
// Start the app by listening on the default Heroku port
server.listen(process.env.PORT || 8080);