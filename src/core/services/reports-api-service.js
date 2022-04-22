import http from './http-common'

class ReportsApiService {
    getAll() {
        return http.get('/reports');
    }

    getById(id) {
        return http.get(`/reports/${ id }`);
    }

    getAllByTechnicianId(technicianId) {
        return http.get(`/technicians/${ technicianId }/reports`);
    }

    create(data) {
        return http.post('/reports', data);
    }

    update(id, data) {
        return http.put(`/reports/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/reports/${ id }`);
    }
}

export default new ReportsApiService();