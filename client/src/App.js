import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './components/authentication/Login';
import Reigster from './components/authentication/Register';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Reigster} />
    </BrowserRouter>
  );
}

export default App;
