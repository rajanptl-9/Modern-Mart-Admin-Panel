import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getCustomers = async () => {
    const response = await axios.get(`${base_url}user/all-users`);
    return response.data;
}

const getUnblockedCustomers = async () => {
    const response = await axios.get(`${base_url}user/get-unblocked-customers`,config);
    return response.data;
}
const getBlockedCustomers = async () => {
    const response = await axios.get(`${base_url}user/get-blocked-customers`,config);
    return response.data;
}

const blockCustomer = async (id) => {
    const response = await axios.put(`${base_url}user/block-user/${id}`,{},config);    
    return response.data;
}

const unblockCustomer = async (id) => {
    const response = await axios.put(`${base_url}user/unblock-user/${id}`, {}, config);
    return response.data;
}

const customerService = {
    getCustomers,
    blockCustomer,
    unblockCustomer,
    getUnblockedCustomers,
    getBlockedCustomers,
};

export default customerService;