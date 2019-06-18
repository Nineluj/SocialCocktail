import BaseService from "./BaseService";

export default class CommentService extends BaseService {
    constructor() {
        super();
        this.pathHost = window.location.hostname === 'localhost' ? 'localhost:8080' : '';
        this.getRecentCommentsUrl = '//' + this.pathHost + '/api/comments/recent/NUM_POSTS'
        this.getFollowingCommentsUrl = '//' + this.pathHost + '/api/comments/following/NUM_POSTS'
        this.getCommentsUrl = '//' + this.pathHost + '/api/comments/NUM_POSTS'
        this.findCommentsByCocktailIdUrl = '//' + this.pathHost + '/api/cocktail/COCKTAIL_ID/comments'
    }

    static myInstance = null;    
    static getInstance() {
        if (CommentService.myInstance === null) {
            CommentService.myInstance = new CommentService();
        }
        return CommentService.myInstance
    }

    getRecentComments = numPosts => this.findAllItems(`/comments/recent/${numPosts}`);

    getFollowingComments = numPosts => this.findAllItems(`/comments/following/${numPosts}`);

    getComments = numPosts => this.findAllItems(`/comments/${numPosts}`);

    getCommentsByUserId = (userId, numPosts) => this.findAllItems(`/user/${userId}/comments/${numPosts}`)

    createComment = (comment, cocktailId) => this.createItem(`/cocktail/${cocktailId}/comments`, comment);

    findCommentsByCocktailId = (cocktailId) => this.findById(`/cocktail/${cocktailId}/comments`)
}