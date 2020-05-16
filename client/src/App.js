import React from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';

import OptionsView from './components/OptionsView';

// import { w3cwebsocket as W3CWebSocket } from 'websocket';

// const client = new W3CWebSocket('wss://trade.ledgerx.com/api/ws');

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path='/' component={OptionsView} />
      </BrowserRouter>
    </div>
  );
}

export default App;
