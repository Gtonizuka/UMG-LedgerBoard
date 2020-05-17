const app = require('express')();
const http = require('http').Server(app);

const socket = require('socket.io');
const WebSocket = require('isomorphic-ws');

const io = socket(http, {
  extraHeaders: {
    'Access-Control-Allow-Credentials': 'omit',
  },
});

const ws = new WebSocket('wss://trade.ledgerx.com/api/ws');

ws.on('message', function incoming(data) {
  console.log(data);

  io.emit('quotes', data);
});

io.on('connection', function (socket) {
  console.log('Connection established');
});

http.listen(4000, function () {
  console.log('listening on *:4000');
});
