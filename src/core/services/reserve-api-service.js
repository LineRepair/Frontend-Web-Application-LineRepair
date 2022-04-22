import http from './http-common'

class ReserveApiService {
    getAll() {
        return http.get('/appointments');
    }

    getById(id) {
        return http.get(`/appointments/${ id }`);
    }

    getModels(id) {
        return http.get(`/appointments/${ id }/applianceModels`);
    }

    create(data) {
        return http.post('/appointments', data);
    }

    update(id, data) {
        return http.put(`/appointments/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/appointments/${ id }`);
    }
}

export default new ReserveApiService();