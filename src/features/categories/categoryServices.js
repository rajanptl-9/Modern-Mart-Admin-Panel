import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getCategories = async () => {
    const response = await axios.get(`${base_url}category/`);
    return response.data;
}

const createCategory = async (category) => {
    const response = await axios.post(`${base_url}category/`, category,config);
    return response.data;
}

const getOneCategory = async (id) => {
    const response = await axios.get(`${base_url}category/${id}`);
    return response.data;
}

const updateCategory = async (category) => {
    const response = await axios.put(`${base_url}category/${category.id}`, category.data,config);
    return response.data;
}

const deleteCategory = async (id) => {
    const response = await axios.delete(`${base_url}category/${id}`,config);
    return response.data;
}


const categoryServices = {
    getCategories,
    createCategory,
    getOneCategory,
    updateCategory,
    deleteCategory,
}

export default categoryServices;