import http from './http-common'

class AppointmentsApiService {
    getAll() {
        return http.get('/appointments');
    }

    getById(id) {
        return http.get(`/appointments/${ id }`);
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

export default  new AppointmentsApiService();