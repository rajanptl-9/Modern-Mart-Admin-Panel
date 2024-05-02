import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getColors = async () => {
    const response = await axios.get(`${base_url}color/`);
    return response.data;
};

const createColor = async (data) => {
    const response = await axios.post(`${base_url}color/`, data, config);
    return response.data;
}

const getOneColor = async (id) => {
    const response = await axios.get(`${base_url}color/${id}`);
    return response.data;
};

const updateColor = async (color) => {
    const response = await axios.put(`${base_url}color/${color.id}`, color.data, config);
    return response.data;
}

const deleteColor = async (id) => {
    const response = await axios.delete(`${base_url}color/${id}`, config);
    return response.data;
}

const colorServices = {
    getColors,
    createColor,
    getOneColor,
    updateColor,
    deleteColor,
};

export default colorServices;