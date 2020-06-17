import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Components/authentication/Login';
import Reigster from './Components/authentication/Register';
import Home from './Components/Home/Home';
import NewsDetails from './Components/Home/NewsDetails';
import Favorites from './Components/Favorites/Favorites';
import NavBar from './Components/Navbar/Navbar';
import './App.css'
import PrivateRoute from './HOCS/PrivateRoute';
function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Reigster} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/article/:id" component={NewsDetails} />
      <PrivateRoute exact path="/favorites" component={Favorites} />
    </BrowserRouter>
  );
}

export default App;
