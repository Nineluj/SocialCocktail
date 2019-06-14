import React from 'react'
import UserService from '../../services/UserService'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import HomeNavHeader from './HomeNavHeader';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
    }

    render() {
        return (
            <div>
                <HomeNavHeader user={this.props.user}/>
            </div>
        )
    }
}

export default Home