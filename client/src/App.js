import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Components/authentication/Login';
import Reigster from './Components/authentication/Register';
import Home from './Components/Home/Home';
import './App.css'
import PrivateRoute from './HOCS/PrivateRoute';
require('dotenv').config();
function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Reigster} />
      {/* <PrivateRoute exact path="/ome" component={Home} /> */}
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  );
}

export default App;
