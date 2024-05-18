import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authServices from "./authServices";

const initialState = {
    user: null,
    forgotPassword: null,
    resetPassword: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const login = createAsyncThunk("auth/login-admin", async (user, thunkAPI) => {
    try {
        const response = await authServices.login(user);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const forgotPassword = createAsyncThunk("auth/forgot-password", async (email, thunkAPI) => {
    try {
        const response = await authServices.forgotPassword(email);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export  const resetPassword = createAsyncThunk("auth/reset-password", async (data, thunkAPI) => {
    try {
        const response = await authServices.resetPassword(data);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;            
            state.user = action.payload;
            state.message = "Success";
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.user = null;
            state.message = "Rejected";
        })
        .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.forgotPassword = action.payload;
            state.isError = false;
            state.message = "User logged in successfully!";
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.forgotPassword = null;
            state.message = action.error;
        })
        .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.resetPassword = action.payload;
            state.isError = false;
            state.message = "User logged in successfully!";
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.resetPassword = null;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState)
    },
});

export const resetState = createAction("User_logout");

export default authSlice.reducer;