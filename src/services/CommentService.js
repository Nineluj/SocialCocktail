import BaseService from "./BaseService";

export default class CommentService extends BaseService {
    constructor() {
        super();
        this.pathHost = window.location.hostname === 'localhost' ? 'localhost:8080' : '';
        this.getRecentCommentsUrl = '//' + this.pathHost + '/api/comments/recent/NUM_POSTS'
    }

    static myInstance = null;    
    static getInstance() {
        if (CommentService.myInstance === null) {
            CommentService.myInstance = new CommentService();
        }
        return CommentService.myInstance
    }

    getRecentComments = (numPosts) => {
        return fetch(this.getRecentCommentsUrl.replace('NUM_POSTS', numPosts))
        .then(response => response.json())
    }

}