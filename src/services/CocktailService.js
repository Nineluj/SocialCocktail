export default class CocktailService {
    constructor() {
        this.pathHost = window.location.hostname === 'localhost' ? 'localhost:8080' : '';

        this.createCocktailUrl = '//' + this.pathHost + '/api/cocktails'
    }

    static myInstance = null;    
    static getInstance() {
        if (CocktailService.myInstance === null) {
            CocktailService.myInstance = new CocktailService();
        }
        return CocktailService.myInstance
    }

    // Returns status of creating a cocktail
    createCocktail = (cocktail) => {
        return fetch(this.createCocktailUrl, {
            method: 'POST',
            body: JSON.stringify(cocktail),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.status)
    }
}