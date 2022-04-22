import http from './http-common'

class AdministratorsApiService {
    getAll() {
        return http.get('/administrators');
    }

    getById(id) {
        return http.get(`/administrators/${ id }`);
    }

    getByUserId(userId) {
        return http.get(`/administrators/user/${ userId }`);
    }

    create(data) {
        return http.post('/administrators', data);
    }

    update(id, data) {
        return http.put(`/administrators/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/administrators/${ id }`);
    }
}

export default new AdministratorsApiService();