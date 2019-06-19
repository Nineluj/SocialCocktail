import BaseService from "./BaseService";

export default class CocktailService extends BaseService {
    constructor() {
        super();
        this.pathHost = window.location.hostname === 'localhost' ? 'localhost:8080' : '';
        this.createCocktailUrl = '//' + this.pathHost + '/api/cocktails?glassType=GLASS_TYPE'
    }

    static myInstance = null;    
    static getInstance() {
        if (CocktailService.myInstance === null) {
            CocktailService.myInstance = new CocktailService();
        }
        return CocktailService.myInstance
    }

    // Returns status of creating a cocktail
    createCocktail = (cocktail, glassType) => {
        return fetch(encodeURI(this.createCocktailUrl.replace('GLASS_TYPE', glassType)), {
            method: 'POST',
            body: JSON.stringify(cocktail),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.status)
    }

    findCocktailById = id => this.findById(`/cocktails/${id}`);

    findUserLikes = id => this.findById(`/cocktails/${id}/likes`);

    likeCocktail = id => this.postNoResponse(`/cocktails/${id}/likes`);
}