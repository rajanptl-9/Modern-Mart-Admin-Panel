import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import categoryServices from './categoryServices';
import logout from '../../utils/logout';
import { toastError, toastSuccess } from '../../utils/tostify';

const initialState = {
    categories: null,
    categoryName: null,
    updatedCategory: null,
    deletedCategory: null,
    newCategory: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getCategories = createAsyncThunk('category/get-categories', async (thunkAPI) => {
    try {
        const response = await categoryServices.getCategories();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createCategory = createAsyncThunk('category/create-category', async (category, thunkAPI) => {
    try {
        const response = await categoryServices.createCategory(category);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOneCategory = createAsyncThunk('category/get-one-category', async (id,thunkAPI) => {
    try {
        const response = await categoryServices.getOneCategory(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateCategory = createAsyncThunk('category/update-category', async (category, thunkAPI) => {
    try {
        const response = await categoryServices.updateCategory(category);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteCategory = createAsyncThunk('category/delete-category', async (id, thunkAPI) => {
    try{
        const response = await categoryServices.deleteCategory(id);
        return response;
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});


export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.categories = null;
                state.message = action.error;
                if (logout(action.error.message)) {
                    toastError('Session Expired! Please Log In.')
                }
            })
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.newCategory = action.payload.title;
                state.message = "Category Created Suuccessfully!";
            })
            .addCase(createCategory.rejected,(state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.newCategory = {};
                state.message = "Creation failed!";
                if (logout(action.error.message)) {
                    toastError('Session Expired! Please Log In.')
                }
            })
            .addCase(getOneCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOneCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.categoryName = action.payload.title;
                state.message = "Category fetched successfully";
            })
            .addCase(getOneCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.categoryName = null;
                state.message = action.error;
                if (logout(action.error.message)) {
                    toastError('Session Expired! Please Log In.')
                }
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.updatedCategory = action.payload.title;
                state.message = "Category Updated Suuccessfully!";
            })
            .addCase(updateCategory.rejected,(state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.updatedCategory = null;
                state.message = "Update failed!";
                if (logout(action.error.message)) {
                    toastError('Session Expired! Please Log In.')
                }                
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedCategory = action.payload.title;
                state.message = "Category Deleted Successfully!";
                toastSuccess("Category Deleted!");
            })
            .addCase(deleteCategory.rejected,(state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.deletedCategory = null;
                state.message = "Delete failed!";
                if (logout(action.error.message)) {
                    toastError('Session Expired! Please Log In.')
                }else{
                    toastError("Category Failed to Delete!")
                }
            })
            .addCase(resetState, () => initialState)
    },
});

export const resetState = createAction('Category_reset_all')

export default categorySlice.reducer;