import React from 'react'
import UserService from '../../services/UserService'
import {Link, Redirect} from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
        this.state = {
            username: '',
            password: '',
            password2: '',
            role: 'STANDARD'
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
        if (this.props.user.username !== undefined) {
            return (
                <Redirect to='/'/>
            )
        }

        return (
            <div className="container">
            <h1>Sign Up</h1>
                <div className="form-group row">
                    <label for="username"
                           className="col-sm-2 col-form-label">
                        Username </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               id="username"
                               placeholder="Alice"
                               value={this.state.username}
                               onChange={this.updateUsername}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="password"
                           className="col-sm-2 col-form-label">
                        Password </label>
                    <div className="col-sm-10">
                        <input type="password"
                               className="form-control wbdv-password-fld"
                               id="password"
                               placeholder="123qwe#$%"
                               value={this.state.password}
                               onChange={this.updatePassword}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="verify"
                            className="col-sm-2 col-form-label">
                        Verify Password </label>
                    <div className="col-sm-10">
                        <input type="password"
                                className="form-control wbdv-password-fld"
                                id="verfiy"
                                placeholder="123qwe#$%"
                                value={this.state.password2}
                                onChange={this.updatePassword2}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="role"
                            className="col-sm-2 col-form-label">
                            Role </label>
                    <select className="form-control col-sm-10"
                            id="role"
                            value={this.state.role}
                            onChange={(event) => this.setState({
                                role: event.target.value
                            })}>
                        <option value='STANDARD'>Standard User</option>
                        <option value='ADMIN'>Admin</option>

                    </select>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <button className="btn btn-primary btn-block"
                                onClick={() => {
                                        if (this.state.password === this.state.password2) {
                                            this.userService.registerUser({
                                            username: this.state.username,
                                            password: this.state.password,
                                            role: this.state.role
                                            }).then(response =>
                                                response.status === 200
                                                    ? this.props.retrieveLoggedInUser()
                                                    : alert('Registration failed.'))
                                        }
                                        else {
                                            alert("Passwords do not match")
                                        }   
                                    }}>Sign up</button>
                        <div className="row">
                            <div className="col-6">
                                <Link to="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}

export default Register