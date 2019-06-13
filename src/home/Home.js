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
                <h2><Link to="/login">Login</Link></h2>}

                {this.props.user.id !== undefined &&
                <div>
                    <h2>
                        <a href='#' onClick={() => 
                            this.userService.logoutUser()
                            .then(response => response.status === 200 ? window.location.reload() : alert('Could not log out.'))}>
                                Logout
                        </a>
                    </h2>
                    <h2><Link to="/profile">Profile</Link></h2>
                </div>
            }
            </div>
        )
    }
}

export default Home