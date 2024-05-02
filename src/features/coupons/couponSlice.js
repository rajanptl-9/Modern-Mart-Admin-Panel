import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponServices from "./couponServices";

const initialState = {
    coupons: null,
    newCoupon: null,
    couponData: null,
    updatedCoupon: null,
    deletedCoupon: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getOneCoupon = createAsyncThunk("coupons/get-one-coupon", async (id, thunkAPI) => {
    try {
        const response = await couponServices.getOneCoupon(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateCoupon = createAsyncThunk("coupons/update-coupon", async (data, thunkAPI) => {
    try {
        const response = await couponServices.updateCoupon(data);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getCoupons = createAsyncThunk("coupons/get-coupons", async (thunkAPI) => {
    try {
        const response = await couponServices.getCoupons();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createCoupon = createAsyncThunk("coupons/add-coupon", async (data, thunkAPI) => {
    try {
        const response = await couponServices.createCoupon(data);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteCoupon = createAsyncThunk("coupons/delete-coupon", async (id, thunkAPI) => {
    try {
        const response = await couponServices.deleteCoupon(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.coupons = action.payload;
                state.message = "Coupons fetched successfully";
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.coupons = null;
                state.message = action.payload;
            })
            .addCase(createCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.newCoupon = action.payload.name;
                state.message = "Coupon created successfully";
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.newColor = null;
                state.message = "Creation failed!";
            })
            .addCase(getOneCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOneCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.couponData = action.payload;
                state.message = "Coupons fetched successfully";
            })
            .addCase(getOneCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.couponData = null;
                state.message = action.payload;
            })
            .addCase(updateCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.updatedCoupon = action.payload;
                state.message = "Coupon created successfully";
            })
            .addCase(updateCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.newColor = null;
                state.message = "Update failed!";
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedCoupon = action.payload;
                state.message = "Coupon deleted successfully";
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.deletedCoupon = null;
                state.message = "Delete failed!";
            })
            .addCase(resetState, () => initialState)
    }
});

export const resetState = createAction("Coupon_reset_all")

export default couponSlice.reducer;
