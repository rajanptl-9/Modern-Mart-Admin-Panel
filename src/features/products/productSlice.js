import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productServices from "./productServices";

const initialState = {
    products: null,
    newProduct: null,
    productData: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const getProducts = createAsyncThunk("product/get-Products", async (thunkAPI) => {
    try {
        const response = await productServices.getProducts();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createProduct = createAsyncThunk("product/create-Product", async (product, thunkAPI) => {
    try {
        const response = await productServices.createProducts(product);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOneProduct = createAsyncThunk("product/get-One-Product", async (id, thunkAPI) => {
    try {
        const response = await productServices.getOneProduct(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteProduct = createAsyncThunk("product/delete-Product", async (id, thunkAPI) => {
    try {
        const response = await productServices.deleteProduct(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.products = null;
                state.message = action.error;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.newProduct = action.payload.title;
                state.message = "New Product is created successfully!";
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.newProduct = null;
                state.message = action.meta.requestId;
            })
            .addCase(getOneProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOneProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.productData = action.payload;
                state.message = "Product is fetched successfully!";
            })
            .addCase(getOneProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.newProduct = {};
                state.message = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedProduct = action.payload;
                state.message = "Product deleted successfully!";
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.deletedProduct = {};
                state.message = action.error.message;
            })
            .addCase(resetState, () => initialState)
    },
});

export const resetState = createAction("Product_reset_all");

export default productSlice.reducer;
