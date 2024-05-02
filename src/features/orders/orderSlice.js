import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import orderServices from './orderServices';

const initialState = {
    orders: [],
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

const orderSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
        });
        builder.addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.orders = null;
            state.message = action.error;
        });
    }
});

export default orderSlice.reducer;