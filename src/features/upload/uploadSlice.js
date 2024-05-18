import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadServices from "./uploadServices";
import { toast } from "react-toastify";
import logout from "../../utils/logout";

const initialState = {
    images : [],
    isError : false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const uploadImg = createAsyncThunk(
    "upload/uploadImg",
    async (data, thunkAPI) => {
        try {
            const formData = new FormData();
            if(data){
                data.forEach((file) => {
                    formData.append("images", file);
                })
            }
            const response = await uploadServices.uploadImg(formData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteImg = createAsyncThunk(
    "upload/delete-image",
    async (data, thunkAPI) => {
        try {           
            const response = await uploadServices.deleteImg(data.public_id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    } 
);

const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImg.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(uploadImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const temp = state.images;
                temp.push(action.payload[0]);
                state.images = [...temp];                
                state.message = action.payload.message;                
            })
            .addCase(uploadImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                if(logout(action.error.message)){
                    toast.error('Session Expired! Please Log In.')
                }            
            })
            .addCase(deleteImg.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(deleteImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;                
                let temp = state.images;
                temp = temp.filter((image) => image.public_id !== action.meta.arg.public_id);
                state.images = [...temp];    
                state.message = action.payload.message;
            })
            .addCase(deleteImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                if(logout(action.error.message)){
                    toast.error('Session Expired! Please Log In.')
                }            
            });
    },
});

export default uploadSlice.reducer;