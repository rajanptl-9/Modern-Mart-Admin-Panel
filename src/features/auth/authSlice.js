import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authServices from "./authServices";

const initialState = {
    user: null,
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
        .addCase(resetState, () => initialState)
    },
});

export const resetState = createAction("User_logout");

export default authSlice.reducer;