import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getOrders = async () => {
    const response = await axios.get(`${base_url}user/get-all-orders`,config);
    return response.data;
}

const getMonthlyOrderIncome = async() => {
    const response = await axios.get(`${base_url}user/get-monthly-order-income`,config);
    return response.data;
}

const getMonthWiseOrderCount = async() => {
    const response = await axios.get(`${base_url}user/get-monthly-order-count`,config);
    return response.data;
}

const getYearlyOrder = async() => {
    const response = await axios.get(`${base_url}user/get-yearly-order`,config);
    return response.data;
}

const updateOrderStatus = async(data) => {
    const response = await axios.put(`${base_url}user/order/update-order/${data.id}`,{status:data.status},config);
    return response.data;
    
}

const orderServices = {
    getOrders,
    getMonthlyOrderIncome,
    getMonthWiseOrderCount,
    getYearlyOrder,
    updateOrderStatus,
}

export default orderServices;