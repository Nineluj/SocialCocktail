import {API_ROOT} from '../api-config';

class BaseService {
    handleResponseForError = (response) => {
        if (response.status !== 200) {
            return -1;
        } else {
            return response.json();
        }
    };

    findAllItems = (path) =>
        fetch(`${API_ROOT}${path}`)
            .then(this.handleResponseForError);

    findById = (path) =>
        fetch(`${API_ROOT}${path}`)
            .then(this.handleResponseForError);

    createItem = (path, newItem) =>
        fetch(`${API_ROOT}${path}`, {
            method: 'POST',
            body: JSON.stringify(newItem),
            headers: {
                'content-type': 'application/json'
            }
        }).then(this.handleResponseForError);

    updateItem = (path, newItem) =>
        fetch(`${API_ROOT}${path}`, {
            method: 'PUT',
            body: JSON.stringify(newItem),
            headers: {
                'content-type': 'application/json'
            }
        }).then(this.handleResponseForError);

    deleteItem = (path) =>
        fetch(`${API_ROOT}${path}`, {
            method: 'DELETE',
        })
}

export default BaseService;