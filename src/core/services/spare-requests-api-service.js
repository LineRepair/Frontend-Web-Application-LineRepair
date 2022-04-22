import http from './http-common'

class SpareRequestApiService {
    getAll() {
        return http.get('/sparerequests');
    }

    getById(id) {
        return http.get(`/sparerequests/${ id }`);
    }
    getAllByTechnicianId(technicianId) {
        return http.get(`/technicians/${ technicianId }/sparerequests`);
    }

    create(data) {
        return http.post('/sparerequests', data);
    }

    update(id, data) {
        return http.put(`/sparerequests/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/sparerequests/${ id }`);
    }
}

export default new SpareRequestApiService();