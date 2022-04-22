import http from './http-common'

class PlansApiService {
    getAll() {
        return http.get('/plans');
    }

    getById(id) {
        return http.get(`/plans/${ id }`);
    }

    create(data) {
        return http.post('/plans', data);
    }

    update(id, data) {
        return http.put(`/plans/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/plans/${ id }`);
    }
}

export default new PlansApiService();