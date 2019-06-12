import React from 'react'

class Profile extends React.Component {
    constructor(props) {
        super(props)
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
                                readonly="true"/>
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
                                type="tel"/>
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
                                type="email"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="role"
                            class="col-sm-2 col-form-label">
                            Role </label>
                        <div class="col-sm-10">
                            <select class="form-control"
                                    id="role">
                                <option>Faculty</option>
                                <option>Student</option>
                                <option>Admin</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="dob"
                            class="col-sm-2 col-form-label">
                            Date of Birth </label>
                        <div class="col-sm-10">
                            <input class="form-control"
                                id="dob"
                                placeholder="mm/dd/yy"
                                type="date"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"></label>
                        <div class="col-sm-10">
                            <button class="btn btn-success btn-block">Update</button>
                            <button class="btn btn-danger btn-block">Logout</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Profile