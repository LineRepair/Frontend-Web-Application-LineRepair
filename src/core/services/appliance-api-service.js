import http from './http-common'

class ApplianceApiService {
    getById(id) {
        return http.get(`/appliance/${ id }`);
    }

    getAllByClientId(clientId) {
        return http.get(`/appliance/client/${ clientId }`);
    }

    create(data) {
        return http.post('/appliance', data);
    }

    update(id, data) {
        return http.put(`/appliance/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/appliance/${ id }`);
    }
}

export default new ApplianceApiService