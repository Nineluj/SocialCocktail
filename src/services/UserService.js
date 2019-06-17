import sha256 from 'crypto-js/sha256';

export default class UserService {
    constructor() {
        this.pathHost = window.location.hostname === 'localhost' ? 'localhost:8080' : '';

        this.authenticateUserUrl = '//' + this.pathHost + '/api/users/login'
        this.registerUserUrl = '//' + this.pathHost + '/api/users/register'
        this.getLoggedInUserUrl = '//' + this.pathHost + '/api/user'
        this.logoutUserUrl = '//' + this.pathHost + '/api/user/logout'
        this.updateUserUrl = '//' + this.pathHost + '/api/user'
        this.findUserByIdUrl = '//' + this.pathHost + '/api/users/USER_ID'
        this.addLikedCocktailUrl = '//' + this.pathHost + '/api/user/likes/cocktail/COCKTAIL_ID'
        this.getFollowingUrl = '//' + this.pathHost + '/api/user/following'
        this.getFollowersUrl = '//' + this.pathHost + '/api/user/followers'
        this.addFollowingUrl = '//' + this.pathHost + '/api/user/following'
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

    updateUser = (user) => {
        return fetch(this.updateUserUrl, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    findUserById = (id) => {
        return fetch(this.findUserByIdUrl.replace('USER_ID', id), {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
    }

    getFollowers = () => {
        return fetch(this.getFollowersUrl, {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
    }

    getFollowing = () => {
        return fetch(this.getFollowingUrl, {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
    }

    // addLikedCocktail = (id) => {
    //     return fetch(this.addLikedCocktailUrl.replace('COCKTAIL_ID', id), {
    //         method: 'POST',
    //         credentials: 'include'
    //     })
    // }
}