import http from './http-common'

class ApplianceModelsService {
    getAll() {
        return http.get('/appliancemodel');
    }

    getById(id) {
        return http.get(`/appliancemodel/${ id }`);
    }

    create(data) {
        return http.post('/appliancemodel', data);
    }

    update(id, data) {
        return http.put(`/appliancemodel/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/appliancemodel/${ id }`);
    }
}

export default new ApplianceModelsService();