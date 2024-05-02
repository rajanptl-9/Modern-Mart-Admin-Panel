import { configureStore, compose  } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/products/productSlice";
import brandReducer from "../features/brands/brandSlice";
import colorReducer from "../features/colors/colorSlice";
import categoryReducer from "../features/categories/categorySlice";
import enquiryReducer from "../features/enquiries/enquirySlice";
import orderReducer from "../features/orders/orderSlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupons/couponSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
    reducer: { 
        auth: authReducer, 
        products: productReducer,
        colors: colorReducer,
        coupons: couponReducer,
        categories: categoryReducer,
        brands: brandReducer, 
        enquiries: enquiryReducer,
        orders: orderReducer,
        customers: customerReducer, 
        upload: uploadReducer,
    },
},
composeEnhancers());


