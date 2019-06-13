import React from 'react'
import UserService from '../services/UserService';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
        console.log(this.props.user.id)
        this.state = this.props.user
    }

    static getDerivedStateFromProps(props, state) {
      if (props.user.username !== state.username) {
        return props.user
      }  
    }

    render() {
        return (
            <div class="container">
                <h1>Profile</h1>
                <form>
                    <div class="form-group row">
                        <label for="username"
                            class="col-sm-2 col-form-label">
                            Username </label>
                        <div class="col-sm-10">
                            <input class="form-control"
                                id="username"
                                placeholder="Alice"
                                readonly="true"
                                onChange={(event) => this.setState({
                                    username: event.target.value
                                })}
                                value={this.state.username}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="phone"
                            class="col-sm-2 col-form-label">
                            Phone </label>
                        <div class="col-sm-10">
                            <input class="form-control"
                                id="phone"
                                placeholder="(123) 456-7890"
                                type="tel"
                                onChange={(event) => this.setState({
                                    phoneNum: event.target.value
                                })}
                                value={this.state.phoneNum}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="email"
                            class="col-sm-2 col-form-label">
                            Email </label>
                        <div class="col-sm-10">
                            <input class="form-control"
                                id="email"
                                placeholder="alice@wonderland.com"
                                type="email"
                                onChange={(event) => this.setState({
                                    email: event.target.value
                                })}
                                value={this.state.email}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="role"
                            class="col-sm-2 col-form-label">
                            Role </label>
                        <div class="col-sm-10">
                            <select class="form-control"
                                    id="role"
                                    onChange={(event) => this.setState({
                                        role: event.target.value
                                    })}
                                    value={this.state.role}>
                                <option value='STANDARD'>Standard User</option>
                                <option value='ADMIN'>Admin</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"></label>
                        <div class="col-sm-10">
                            <button class="btn btn-success btn-block"
                                    onClick={() => this.userService.updateUser(this.state)
                                                   .then(user => this.setState({
                                                        username: user.username,
                                                        phoneNum: user.phoneNum,
                                                        email: user.email,
                                                        role: user.role,
                                                        id: user.id
                                                   }))}>
                                Update
                            </button>
                            <button class="btn btn-danger btn-block">Logout</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Profile