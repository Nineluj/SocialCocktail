import React from 'react';
import './App.scss';
import Login from './login/Login';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Register from './register/Register';
import Profile from './profile/Profile';
import Search from './search/Search';
import Home from './home/Home';

const App = () =>
    <Router>  
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/search" component={Search}/>
    </Router>

export default App;
