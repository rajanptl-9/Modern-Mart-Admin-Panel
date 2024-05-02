import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getCoupons = async () => {
    const response = await axios.get(`${base_url}coupon`, config);
    return response.data;
}

const createCoupon = async (data) => {
    const response = await axios.post(`${base_url}coupon`, data, config);
    return response.data;
}

const getOneCoupon = async (id) => {
    const response = await axios.get(`${base_url}coupon/${id}`, config);
    return response.data;
}

const updateCoupon = async (coupon) => {
    const response = await axios.put(`${base_url}coupon/${coupon.id}`, coupon.data, config);
    return response.data;
}

const deleteCoupon = async (id) => {
    const response = await axios.delete(`${base_url}coupon/${id}`, config);
    return response.data;
}

const couponServices = {
    getCoupons,
    createCoupon,
    getOneCoupon,
    updateCoupon,
    deleteCoupon,
}
export default couponServices;