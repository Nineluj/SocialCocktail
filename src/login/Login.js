import React from 'react'
import UserService from '../services/UserService'



class Login extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
        this.state = {
            username: '',
            password: ''
        }
    }

    updateUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    updatePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <div class="container">
                <h1>Sign In</h1>
                    <div class="form-group row">
                        <label for="username"
                            class="col-sm-2 col-form-label">
                            Username </label>
                        <div class="col-sm-10">
                            <input class="form-control"
                                id="username"
                                placeholder="Alice"
                                value={this.state.username}
                                onChange={this.updateUsername}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="password"
                            class="col-sm-2 col-form-label">
                            Password </label>
                        <div class="col-sm-10">
                            <input type="password"
                                class="form-control wbdv-password-fld"
                                id="password"
                                value={this.state.password}
                                placeholder="123qwe#$%"
                                onChange={this.updatePassword}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"></label>
                        <div class="col-sm-10">
                            <button class="btn btn-primary btn-block"
                                    onClick={() => this.userService.authenticateUser({
                                        username: this.state.username,
                                        password: this.state.password
                                        })}>Sign in</button>
                            <div class="row">
                                <div class="col-6">
                                    <a href="#">Forgot Password?</a>
                                </div>
                                <div class="col-6">
                                    <a href="../register/register.template.client.html"
                                    class="float-right">Sign up</a>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Login