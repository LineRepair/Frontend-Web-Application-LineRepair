import http from './http-common'

class ApplianceBrandsApiService {
    getAll() {
        return http.get('/appliancebrand');
    }

    getById(id) {
        return http.get(`/appliancebrand/${ id }`);
    }

    create(data) {
        return http.post('/appliancebrand', data);
    }

    update(id, data) {
        return http.put(`/appliancebrand/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/appliancebrand/${ id }`);
    }
}

export default new ApplianceBrandsApiService();