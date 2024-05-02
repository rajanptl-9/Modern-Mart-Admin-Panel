import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorServices from "./colorServices";

const initialState = {
    colors: null,
    newColor: null,
    colorName: null,
    updatedColor: null,
    deletedColor: null,
    error: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const getOneColor = createAsyncThunk("color/get-one-color", async (id,thunkAPI) => {
    try {
        const response = await colorServices.getOneColor(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateColor = createAsyncThunk("color/update-color", async (data, thunkAPI) => {
    try {
        const response = await colorServices.updateColor(data);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getColors = createAsyncThunk("color/get-colors", async (thunkAPI) => {
    try {
        const response = await colorServices.getColors();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createColor = createAsyncThunk("color/create-color", async (data, thunkAPI) => {
    try {
        const response = await colorServices.createColor(data);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteColor = createAsyncThunk("color/delete-color", async (id, thunkAPI) => {
    try {
        const response = await colorServices.deleteColor(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.newColor = {};
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.colors = action.payload;
                state.message = "Colors fetched successfully";
            })
            .addCase(getColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.colors = null;
                state.message = action.error;
            })
            .addCase(createColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.newColor = action.payload.title;
                state.message = "Color created successfully";
            })
            .addCase(createColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.newColor = null;
                state.message = "Creation failed!";
            })
            .addCase(getOneColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOneColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.colorName = action.payload.title;
            })
            .addCase(getOneColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.colorName = null;
                state.message = action.error;
            })
            .addCase(updateColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.updatedColor = action.payload.title;
                state.message = "Color created successfully";
            })
            .addCase(updateColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.updatedColor = null;
                state.message = "Update failed!";
            })
            .addCase(deleteColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedColor = action.payload.title;
                state.message = "Color deleted successfully";
            })
            .addCase(deleteColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.deletedColor = null;
                state.message = "Delete failed!";
            })
            .addCase(resetState, () => initialState)
    },
});

export const resetState = createAction("Color_reset_all");

export default colorSlice.reducer;