import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import OptionsView from './components/OptionsView';
import PriceContainer from './components/PriceContainer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <PriceContainer />
        <Route exact path='/' component={OptionsView} />
      </BrowserRouter>
    </div>
  );
}

export default App;
