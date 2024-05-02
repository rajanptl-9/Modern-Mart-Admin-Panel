import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandServices from "./brandServices";

const initialState = {
    brands: null,
    newBrand: null,
    brandName : null,
    updatedBrand: null,
    deletedBrand: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const getOneBrand = createAsyncThunk("brand/get-one-brand", async (id, thunkAPI) => {
    try {
        const response = await brandServices.getOneBrand(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getBrands = createAsyncThunk("brand/get-brands", async (thunkAPI) => {
    try {
        const response = await brandServices.getBrands();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBrand = createAsyncThunk("brand/create-Brand", async (brand, thunkAPI) => {
    try {
        const response = await brandServices.createBrand(brand);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateBrand = createAsyncThunk("brand/update-Brand", async (brandData, thunkAPI) => {
    try {
        const response = await brandServices.updateBrand(brandData);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteBrand = createAsyncThunk("brand/delete-Brand", async (id, thunkAPI) => {
    try {
        const response = await brandServices.deleteBrand(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.newBrand = action.payload.title;
                state.message = "Brand Created Successfully";
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Creation failed!";
            })
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.brands = action.payload;
                state.message = "Brands fetched successfully";
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.brands = {};
                state.message = action.meta.requestId;
            })
            .addCase(getOneBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOneBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.brandName = action.payload.title;
                state.message = "Brand fetched successfully";
            })
            .addCase(getOneBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.brandName = null;
                state.message = action.meta.requestId;
            })
            .addCase(updateBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.updatedBrand = action.payload.title;
                state.message = "Brand Updated Successfully!";
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.updatedBrand = null;
                state.message = "Update failed!";
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedBrand = action.payload.title;
                state.message = "Brand Updated Successfully!";
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.deletedBrand = null;
                state.message = "Update failed!";
            })
            .addCase(resetState, () => initialState)

    },
});

export const resetState = createAction('Brand_reset_all');

export default brandSlice.reducer;
