import BaseService from "./BaseService";

class AdminService extends BaseService {
    constructor() {
        super();
        this.pathHost = window.location.hostname === 'localhost' ? 'localhost:8080' : '';
        this.createCocktailUrl = '//' + this.pathHost + '/api/cocktails?glassType=GLASS_TYPE'
    }

    static myInstance = null;
    static getInstance() {
        if (AdminService.myInstance === null) {
            AdminService.myInstance = new AdminService();
        }
        return AdminService.myInstance
    }

    getBartenderRequests = () => this.findAllItems(`/users/bartenders`);

    verifyBartenderRequest = uid => this.postNoResponse(`/users/bartenders/${uid}`);
}

export default AdminService;