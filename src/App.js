import React from 'react';
import './App.scss';
import Login from './login/Login';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Register from './register/Register';
import Profile from './profile/Profile';
import Search from './search/Search';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cocktailSearchText: "",
            shownCocktails: [],
            modalShown: false,
            modalCocktailId: -1
        }
    }

    updateResults = (results) => {
        results.then(
            objs => this.setState({
                shownCocktails: objs.drinks
            })

        );

        console.log(this.state)
    };

    updateSearch = (event) => {
        let search = event.target.value;

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
            .then(response => this.updateResults(response.json()));

        this.setState({
            cocktailSearchText: event.target.value
        })
    };

    showInformation = (id) => {
        this.setState({
            modalShown: true,
            modalCocktailId: id
        });
    };

    hideModal = () => {
        this.setState({
            modalShown: false,
            modalCocktailId: -1
        });
    };


    render() {
        return (
            <Router>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/search" component={Search}/>
            </Router>
        );
    }
}

export default App;
