import sha256 from 'crypto-js/sha256';

export default class UserService {
    constructor() {
        this.pathHost = window.location.hostname === 'localhost' ? 'localhost:8080' : '';

        this.authenticateUserUrl = '//' + this.pathHost + '/api/users/login'
        this.registerUserUrl = '//' + this.pathHost + '/api/users/register'
        this.getLoggedInUserUrl = '//' + this.pathHost + '/api/user'
        this.logoutUserUrl = '//' + this.pathHost + '/api/user/logout'
    }

    static myInstance = null;    
    static getInstance() {
        if (UserService.myInstance === null) {
            UserService.myInstance = new UserService();
        }
        return UserService.myInstance
    }

    authenticateUser = (user) => {
        user.password = sha256(user.password).toString()
        return fetch(this.authenticateUserUrl, {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    registerUser = (user) => {
        user.password = sha256(user.password).toString()
        return fetch(this.registerUserUrl, {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    getLoggedInUser = () => {
        return fetch(this.getLoggedInUserUrl, {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            }
            return {}
        })
    }

    logoutUser = () => {
        return fetch(this.logoutUserUrl, {
            method: 'GET',
            credentials: 'include'
        })
    }
}