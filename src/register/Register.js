import React from 'react'
import UserService from '../services/UserService'



class Register extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
        this.state = {
            username: '',
            password: '',
            password2: ''
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

    updatePassword2 = (event) => {
        this.setState({
            password2: event.target.value
        })
    }

    render() {
        return (
            <div class="container">
            <h1>Sign Up</h1>
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
                               placeholder="123qwe#$%"
                               value={this.state.password}
                               onChange={this.updatePassword}/>
                    </div>
                </div>
                <div class="form-group row">
                        <label for="verify"
                               class="col-sm-2 col-form-label">
                            Verify Password </label>
                        <div class="col-sm-10">
                            <input type="password"
                                   class="form-control wbdv-password-fld"
                                   id="verfiy"
                                   placeholder="123qwe#$%"
                                   value={this.state.password2}
                                   onChange={this.updatePassword2}/>
                        </div>
                    </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"></label>
                    <div class="col-sm-10">
                        <button class="btn btn-primary btn-block"
                                onClick={() => {
                                        if (this.state.password === this.state.password2) {
                                            this.userService.registerUser({
                                            username: this.state.username,
                                            password: this.state.password
                                            })
                                        }
                                        else {
                                            alert("Passwords do not match")
                                        }   
                                    }}>Sign up</button>
                        <div class="row">
                            <div class="col-6">
                                <a href="../login/login.template.client.html">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}

export default Register