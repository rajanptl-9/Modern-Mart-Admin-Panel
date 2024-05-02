import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getOneBrand = async (id) => {
    const response = await axios.get(`${base_url}brand/${id}`);
    return response.data;
}

const getBrands = async () => {
    const response = await axios.get(`${base_url}brand/`);
    return response.data;
};

const createBrand = async (brand) => {
    const response = await axios.post(`${base_url}brand/`, brand, config);
    return response.data;
};

const updateBrand = async (brandData) => {
    const response = await axios.put(`${base_url}brand/${brandData.id}`, brandData.data, config);
    return response.data;
};

const deleteBrand = async (id) => {
    const response = await axios.delete(`${base_url}brand/${id}`, config);
    return response.data;
}

const brandServices = {
    getBrands,
    createBrand,
    getOneBrand,
    updateBrand,
    deleteBrand,
};

export default brandServices;