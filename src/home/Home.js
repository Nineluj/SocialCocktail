import React from 'react'
import UserService from '../services/UserService'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
    }

    render() {
        return (
            <div>
                <h1>Welcome to your Homepage, {this.props.user.username !== undefined ? this.props.user.username : 'Anonymous User'}</h1>
                {this.props.user.id === undefined &&
                <Link to="/login">Login</Link>}
                {this.props.user.id !== undefined &&
                <a href='#' onClick={() => 
                    this.userService.logoutUser()
                    .then(response => response.status === 200 ? this.props.retrieveLoggedInUser : alert('Could not log out.'))}>
                        Logout
                </a>}
            </div>
        )
    }
}

export default Home