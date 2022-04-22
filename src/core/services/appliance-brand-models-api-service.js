import http from './http-common'

class ApplianceBrandModelsApiService {
    getApplianceModelsByBrandId(applianceBrandId) {
        return http.get(`/appliancebrand/${ applianceBrandId }/appliancemodels`);
    }
}

export default new ApplianceBrandModelsApiService();