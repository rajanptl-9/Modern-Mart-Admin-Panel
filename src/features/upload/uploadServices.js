import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from '../../utils/config';

const uploadImg = async (data) => {
    const response = await axios.put(`${base_url}upload`, data, config);
    return response.data;
}

const deleteImg = async (data) => {
    const response = await axios.delete(`${base_url}upload/${data}`, config);
    return response.data;
}

const uploadServices = {
    uploadImg,
    deleteImg
};

export default uploadServices;

