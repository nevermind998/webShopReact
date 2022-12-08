import BaseHttpService from './base-http.service'

const apiClient =  BaseHttpService();

const getAll = async () => {
    return await apiClient.get(`products`);
}

const getById = async (id:number) => {
    return await apiClient.get(`products/${id}`);
}

const getCategories = async () => {
    return await apiClient.get(`products/categories`);
}

const productServices = {
    getAll,
    getById,
    getCategories
}
export default productServices;