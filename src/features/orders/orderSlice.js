import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import orderServices from './orderServices';
import logout from '../../utils/logout';
import { toastError, toastSuccess } from '../../utils/tostify';

const initialState = {
    orders: null,
    monthlyOrderIncome: null,
    monthlyOrderCount: null,
    yearlyOrders: null,
    upadatedOrder: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getOrders = createAsyncThunk("order/get-orders", async (thunkAPI) => {
    try {
        const response = await orderServices.getOrders();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValues(error);
    }
});

export const getMonthlyOrderIncome = createAsyncThunk("order/get-monthly-income", async (thunkAPI) => {
    try {
        const response = await orderServices.getMonthlyOrderIncome();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValues(error);
    }
});

export const getYearlyOrder = createAsyncThunk("order/get-yearly-count", async (thunkAPI) => {
    try {
        const response = await orderServices.getYearlyOrder();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValues(error);
    }
});

export const updateOrderStatus = createAsyncThunk("order/update-order-status", async(data,thunkAPI)=> {
    try {
        const response = await orderServices.updateOrderStatus(data);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValues(error);
    }
})

const orderSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.orders = action.payload;
            state.message = "Orders Fetched Successfully!";
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.orders = null;
            state.message = action.error;
            if(logout(action.error.message)){
                toastError('Session Expired! Please Log In.');
            }            
        })
        .addCase(getMonthlyOrderIncome.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getMonthlyOrderIncome.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.monthlyOrderIncome = action.payload;
            state.message = "Monthly Income Fetched!";
        })
        .addCase(getMonthlyOrderIncome.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.monthlyOrderIncome = null;
            state.message = action.error;
            if(logout(action.error.message)){
                toastError('Session Expired! Please Log In.')
            }            
        })
        .addCase(getYearlyOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getYearlyOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.yearlyOrders = action.payload;
            state.message = "Yearly Orders Fetched!";
        })
        .addCase(getYearlyOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.yearlyOrders = null;
            state.message = action.error;
        })
        .addCase(updateOrderStatus.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.upadatedOrder = action.payload;
            state.message = "Order Status Updated!";
            toastSuccess("Order Status Updated!");
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.upadatedOrder = null;
            state.message = action.error;            
            if(logout(action.error.message)){
                toastError('Session Expired! Please Log In.');
            }else{
                toastError("Order Status not Updated!");
            }            
        })
    }
});

export default orderSlice.reducer;