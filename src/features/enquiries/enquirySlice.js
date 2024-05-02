import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import enquiryServices from './enquiryServices';

const initialState = {
    enquiries: null,
    enquiryData: null,
    deletedEnquiry: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getEnquiries = createAsyncThunk('enquiry/get-enquiries', async (thunkAPI) => {
        try {
            const response = await enquiryServices.getEnquiries();
        return response;
        } catch (error) {
            return thunkAPI.rejectWithValues(error);
        }
    }
);

export const getOneEnquiry = createAsyncThunk('enquiry/get-one-enquiry', async (id, thunkAPI) => {  
    try {
        const response = await enquiryServices.getOneEnquiry(id);
        return response;
    } catch (error) {   
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateEnquiry = createAsyncThunk('enquiry/update-enquiry', async (enquiry, thunkAPI) => {
    try {
        const response = await enquiryServices.updateEnquiry(enquiry);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteEnquiry = createAsyncThunk('enquiry/delete-enquiry', async (id, thunkAPI) => {
    try {
        const response = await enquiryServices.deleteEnquiry(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


const enquirySlice = createSlice({
    name: 'enquiry',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getEnquiries.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getEnquiries.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.enquiries = payload;
        })
        .addCase(getEnquiries.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.enquiries = null;
            state.message = action.error.message;
        })
        .addCase(getOneEnquiry.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getOneEnquiry.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.enquiryData = payload;
            state.message = "Enquiry fetched successfully";
        })
        .addCase(getOneEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.enquiryData = null;
            state.message = action.error.message;
        })
        .addCase(updateEnquiry.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(updateEnquiry.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.enquiryData = payload;
            state.message = "Enquiry Updated successfully";
        })
        .addCase(updateEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.enquiryData = null;
            state.message = action.error.message;
        })
        .addCase(deleteEnquiry.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(deleteEnquiry.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedEnquiry = payload;
            state.message = "Enquiry Updated successfully";
        })
        .addCase(deleteEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.deletedEnquiry = null;
            state.message = action.error.message;
        })
        .addCase(resetState, () => initialState)        
    }
});

export const resetState = createAction("Enquiry_reset_all");

export default enquirySlice.reducer;