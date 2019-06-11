import sha256 from 'crypto-js/sha256';

export default class UserService {
    constructor() {
        this.pathHost = window.location.hostname === 'localhost' ? 'localhost:8080' : '';

        this.authenticateUserUrl = '//' + this.pathHost + '/api/users/login'
        this.registerUserUrl = '//' + this.pathHost + '/api/users/register'
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
        console.log(user)
        return fetch(this.authenticateUserUrl, {
            method: 'POST',
            body: JSON.stringify(user),
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
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}