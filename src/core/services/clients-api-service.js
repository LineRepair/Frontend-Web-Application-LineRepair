import http from './http-common'

class ClientsApiService {
    getAll() {
        return http.get('/clients');
    }

    getById(id) {
        return http.get(`/clients/${ id }`);
    }

    getByUserId(userId) {
        return http.get(`/clients/user/${ userId }`);
    }

    create(data) {
        return http.post('/clients', data);
    }

    update(id, data) {
        return http.put(`/clients/${ id }`, data);
    }

    updatePlan(id, planId) {
        return http.put(`/clients/${ id }/plans/${ planId }`);
    }

    delete(id) {
        return http.delete(`/clients/${ id }`);
    }
}

export default new ClientsApiService