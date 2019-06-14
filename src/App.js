import React from 'react';
import './App.scss';
import Login from './component/login/Login';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Register from './component/register/Register';
import Profile from './component/profile/Profile';
import Search from './component/search/Search';
import Home from './component/home/Home';
import UserService from './services/UserService'
import CocktailDetails from './component/details/CocktailDetails';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
        this.state = {
            user: {}
        };
        this.retrieveLoggedInUser()
    }

    retrieveLoggedInUser = () => {
        this.userService.getLoggedInUser()
        .then(returnedUser => {
            this.setState({
            user: returnedUser
        })});
    };

    render() {
        return (
            <Router>  
                <Route exact path="/" 
                       render={() => <Home user={this.state.user}/>}
                />
                <Route exact path="/login" 
                       render={() => <Login user={this.state.user}  
                                            retrieveLoggedInUser={this.retrieveLoggedInUser}/>}
                />
                <Route exact path="/register" 
                       render={() => <Register user={this.state.user}
                                               retrieveLoggedInUser={this.retrieveLoggedInUser}/>}
                />
                <Route exact path="/profile" 
                       render={() => <Profile user={this.state.user}/>}
                />
                <Route exact path="/profile/:id" 
                       render={({match}) => <Profile id={match.params.id}
                                                     user={{}}/>}
                />
                <Route exact path="/search" 
                       render={() => <Search user={this.state.user}/>}
                />
                <Route exact path="/details/:id"
                       render={({match}) => <CocktailDetails id={match.params.id} user={this.state.user}/>}
                />
            </Router>
        )
    }
}

export default App;
