import React from 'react'
import UserService from '../../services/UserService';
import {Link} from 'react-router-dom'
import UserListPanel from './UserListPanel';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()

        // We are viewing a public profile
        if (this.props.id !== undefined) {
            this.state = {
                isPublic: true,
                user: {},
                followers: [],
                following: []
            }
            this.userService.findUserById(this.props.id)
            .then(user => {
                console.log('retrieved user by id', user)
                this.setState({
                user: user
            })})

            this.userService.getFollowersById(this.props.id)
            .then(followers => this.setState({
                followers: followers
            }))
    
            this.userService.getFollowingById(this.props.id)
            .then(following => this.setState({
                following: following
            }))
        }
        else {
            this.state = {
                isPublic: false,
                user: this.props.user,
                followers: [],
                following: []
            }
            this.userService.getFollowers()
            .then(followers => this.setState({
                followers: followers
            }))
    
            this.userService.getFollowing()
            .then(following => this.setState({
                following: following
            }))
        }
    }

    static getDerivedStateFromProps(props, state) {
      if (props.user.username !== state.user.username &&
          !state.isPublic) {
        return {user: props.user}
      } else {
          return state;
      }
    }

    render() {
        if (this.state.user.id === undefined && 
            !this.state.isPublic) {
            return (<h1>
                        Please <Link to="/login">Login</Link> to View Profile
                    </h1>
                )
        }
        else if (!this.state.isPublic) {
            return (
                <div className="container mt-3">
                    <h1>Profile</h1>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="username"
                                className="col-sm-2 col-form-label">
                                Username </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                    id="username"
                                    placeholder="Alice"
                                    readOnly
                                    value={this.state.user.username}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="phone"
                                className="col-sm-2 col-form-label">
                                Phone </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                    id="phone"
                                    placeholder="(123) 456-7890"
                                    type="tel"
                                    onChange={(event) => this.setState({
                                        phoneNum: event.target.value
                                    })}
                                    value={this.state.user.phoneNum}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email"
                                className="col-sm-2 col-form-label">
                                Email </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                    id="email"
                                    placeholder="alice@wonderland.com"
                                    type="email"
                                    onChange={(event) => this.setState({
                                        email: event.target.value
                                    })}
                                    value={this.state.user.email}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="role"
                                className="col-sm-2 col-form-label">
                                Role
                            </label>
                            <div className="col-sm-10">
                                <select className="form-control"
                                        id="role"
                                        onChange={(event) => this.setState({
                                            role: event.target.value
                                        })}
                                        value={this.state.user.role}>
                                    <option value='STANDARD'>Standard User</option>
                                    <option value='ADMIN'>Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <button className="btn btn-success btn-block"
                                        onClick={() => this.userService.updateUser(this.state)
                                                    .then(user => this.setState({
                                                        user: user
                                                    }))}>
                                    Update
                                </button>
                                <button className="btn btn-danger btn-block">Logout</button>
                            </div>
                        </div>
                    </form>
                    <UserListPanel title='Following' users={this.state.following}/>
                    <UserListPanel title='Followers' users={this.state.followers}/>
                </div>
            )
        }
        else {
            console.log('We are now rendering with this state: ', this.state.user)
            return (
                <div className="container">
                        <h1>Profile</h1>
                        <form>
                            <div className="form-group row">
                                <label htmlFor="username"
                                    className="col-sm-2 col-form-label">
                                    Username </label>
                                <div className="col-sm-10">
                                    <input className="form-control"
                                        id="username"
                                        placeholder="Alice"
                                        readOnly
                                        value={this.state.user.username}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="role"
                                    className="col-sm-2 col-form-label">
                                    Role </label>
                                <div className="col-sm-10">
                                    <select className="form-control"
                                            id="role"
                                            disabled={true}
                                            onChange={(event) => this.setState({
                                                role: event.target.value
                                            })}
                                            value={this.state.user.role}>
                                        <option value='STANDARD'>Standard User</option>
                                        <option value='ADMIN'>Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label"></label>
                            </div>
                        </form>
                        <UserListPanel title='Following' users={this.state.following}/>
                        <UserListPanel title='Followers' users={this.state.followers}/>
                    </div>
            )
        }
    }
}

export default Profile