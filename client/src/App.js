import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import OptionsView from './components/OptionsView';
import ContractView from './components/ContractView';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path='/' component={OptionsView} />
        <Route exact path='/contract/:contractId' component={ContractView} />
      </BrowserRouter>
    </div>
  );
}

export default App;
