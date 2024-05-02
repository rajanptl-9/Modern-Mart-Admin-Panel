import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getOrders = async () => {
    const response = await axios.get(`${base_url}user/get-all-orders`,config);
    return response.data;
}

const orderServices = {
    getOrders,
}

export default orderServices;