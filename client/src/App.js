import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import OptionsView from './components/OptionsView';

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
