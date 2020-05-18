const app = require('express')();
const http = require('http').Server(app);
const axios = require('axios');
const socket = require('socket.io');
const WebSocket = require('isomorphic-ws');

var cors = require('cors');

// use it before all route definitions
app.use(cors({ origin: 'http://localhost:3000' }));

const io = socket(http, {
  extraHeaders: {
    'Access-Control-Allow-Credentials': 'omit',
  },
});

/*
    Create API route for contracts data
*/

const historicData = [];

axios.get('https://trade.ledgerx.com/api/book-tops?').then((res) => {
  const { data } = res.data;
  data.map((el) => {
    const { contract_id } = el;
    historicData.push({
      contract_id,
      prices: [],
    });
  });
});

// Home page route.
app.get('/historic', function (req, res) {
  res.send(historicData);
});

/*
    WS events
*/

const ws = new WebSocket('wss://trade.ledgerx.com/api/ws');

ws.on('message', function incoming(data) {
  const parsed = JSON.parse(data);

  io.emit('quotes', data);
  const x = historicData.find((el) => el.contract_id === parsed.contract_id);
  if (x && x.prices) {
    if (x.prices.length < 30) {
      parsed.time = new Date();
      x.prices.push(parsed);
    }
  }
});

// Listen to server
http.listen(4000, function () {
  console.log('listening on *:4000');
});
