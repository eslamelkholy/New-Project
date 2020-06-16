import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Components/authentication/Login';
import Reigster from './Components/authentication/Register';
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Reigster} />
    </BrowserRouter>
  );
}

export default App;
