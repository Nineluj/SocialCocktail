import React from 'react'
import UserService from '../../services/UserService'
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { withRouter } from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Login extends React.Component {
    constructor(props) {
        console.log(props.user)
        super(props)
        this.userService = UserService.getInstance()
        this.state = {
            username: '',
            password: '',
            role: ''
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
        if (this.props.user.username !== undefined) {
            return (
                <Redirect to='/'/>
            )
        }
        return (
            <Container>
                {this.props.location.state !== undefined &&
                <Row>
                    <Col xs={12}>
                        <Alert variant='warning' className="mt-3">
                            <FontAwesomeIcon icon="exclamation-triangle" className="mr-2"/>
                            {this.props.location.state.message}
                        </Alert>
                    </Col>
                </Row>
                }
                {console.log('@@@', this.props.location)}
                <h1>Sign In</h1>
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
                               value={this.state.password}
                               placeholder="123qwe#$%"
                               onChange={this.updatePassword}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <button className="btn btn-primary btn-block"
                                onClick={() => {
                                    this.userService.authenticateUser({
                                        username: this.state.username,
                                        password: this.state.password
                                    })
                                        .then(response => {
                                            if (response.status === 200) {
                                                this.props.retrieveLoggedInUser();
                                                if (this.props.location.state !== undefined) {
                                                    this.props.history.goBack();
                                                }
                                            } else {
                                                alert('Login failed.')
                                            }})
                                }}>Sign in</button>
                        <div className="row">
                            <div className="col-6">
                                <a href="#">Forgot Password?</a>
                            </div>
                            <div className="col-6">
                                <Link to="/register" className="float-right">Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default withRouter(Login);