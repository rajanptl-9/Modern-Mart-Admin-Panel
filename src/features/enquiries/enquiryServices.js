import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getEnquiries = async () => {
    const response = await axios.get(`${base_url}enquiry`);
    return response.data;
}

const getOneEnquiry = async (id) => {
    const response = await axios.get(`${base_url}enquiry/${id}`);
    return response.data;
}

const updateEnquiry = async (enquiry) => {
    const response = await axios.put(`${base_url}enquiry/${enquiry.id}`, enquiry.data,config);
    return response.data;
}

const deleteEnquiry = async (id) => {
    const response = await axios.delete(`${base_url}enquiry/${id}`,config);
    return response.data;
}

const enquiryServices = {
    getEnquiries,
    getOneEnquiry,
    updateEnquiry,
    deleteEnquiry,
}

export default enquiryServices;