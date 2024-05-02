import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerServices from "./customerServices";

const initialState = {
  customers: null,
  blockedCustomer: null,
  unblockedCustomer: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getUsers = createAsyncThunk("customer/get-customers", async (thunkAPI) => {
  try {
    const response = await customerServices.getCustomers();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUnblockedCustomers = createAsyncThunk("customer/get-unblocked-customers", async (thunkAPI) => {
  try {
    const response = await customerServices.getUnblockedCustomers();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getBlockedCustomers = createAsyncThunk("customer/get-blocked-customers", async (thunkAPI) => {
  try {
    const response = await customerServices.getBlockedCustomers();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const blockCustomer = createAsyncThunk("customer/block-customer", async (id, thunkAPI) => {
  try {
    const response = await customerServices.blockCustomer(id);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const unblockCustomer = createAsyncThunk("customer/unblock-customer", async (id, thunkAPI) => {
  try {
    const response = await customerServices.unblockCustomer(id);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const customerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnblockedCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnblockedCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customers = action.payload;
        state.message = "Unblocked Customers Fetched Successfully";
      })
      .addCase(getUnblockedCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.customers = null;
        state.message = action.error.message;
      })
      .addCase(getBlockedCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlockedCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customers = action.payload;
        state.message = "Blocked Customers Fetched Successfully";
      })
      .addCase(getBlockedCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.customers = null;
        state.message = action.error.message;
      })
      .addCase(blockCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blockedCustomer = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(blockCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blockedCustomer = null;
        state.message = action.error.message;
      })
      
      .addCase(unblockCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unblockCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.unblockedCustomer = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(unblockCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.unblockedCustomer = null;
        state.message = action.error.message;
      })
  }
});

export default customerSlice.reducer;