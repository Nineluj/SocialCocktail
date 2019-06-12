import React from 'react'
import UserService from '../services/UserService'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
        this.state = {
            user: {}
        }
    }

    render() {
        console.log(this.state.user.username)
        return (<h1>home works!</h1>)
    }
}

export default Home