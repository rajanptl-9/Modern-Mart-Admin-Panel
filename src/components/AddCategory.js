import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getOneCategory, resetState, updateCategory } from '../features/categories/categorySlice';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoAdd } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";

const AddCategory = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const createCategoryState = useSelector((state) => state.categories);
    const categoryId = location.pathname.split('/')[3];
    const { categoryName : cname } = useSelector((state) => state.categories);

    const categorySchema = yup.object().shape({
        title: yup.string().required("Enter Category Title"),
    });

    useEffect(() => {
        categoryFormik.resetForm();
        if (categoryId !== undefined && categoryId !== "") {
            dispatch(getOneCategory(categoryId));
        }else{
            dispatch(resetState());
        }
        //eslint-disable-next-line
    }, [categoryId]);

    const categoryFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: cname || '',
        },
        validationSchema: categorySchema,
        onSubmit: values => {
            if (categoryId !== undefined && categoryId !== "") {
                const data = {
                    id: categoryId,
                    data: {
                        title: values.title
                    }
                }
                dispatch(updateCategory(data));
            } else {
                dispatch(createCategory(values));
            }
        },
    });

    useEffect(() => {
        if (createCategoryState.isSuccess && !createCategoryState.isError) {
            if (createCategoryState.newCategory !== null || createCategoryState.updatedCategory !== null) {
                if (categoryId === undefined || categoryId === "") {
                    toast('✔ Category created successfully!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    dispatch(resetState());
                } else if (categoryId !== undefined && categoryId !== "") {
                    toast.info('✔ Category updated successfully! Redirecting...', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        onClick: () => {
                            dispatch(resetState());
                            navigate("/admin/category-list");
                        }
                    });
                    dispatch(resetState());
                    setTimeout(() => {
                        navigate("/admin/category-list");
                    }, 3000);
                }
                categoryFormik.resetForm();
            }
        } else if (createCategoryState.isError && !createCategoryState.isSuccess) {
            let message = "";
            if (createCategoryState.message === "Update failed!") {
                message = '✖ Category update failed! Please try again.';
            } else if (createCategoryState.message === "Creation failed!") {
                message = '✖ Category creation failed! Please try again.';
            }
            toast.error(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            dispatch(resetState());
        }
        //eslint-disable-next-line
    }, [createCategoryState.isSuccess, createCategoryState.isError, createCategoryState.isLoading])

    return (
        <div className='add-form-list d-flex flex-column gap-16'>
            <form action='' className="box-container w-100 d-flex flex-column flex-grow-1 bg-white rounded-3 p-3 align-items-center gap-16" onSubmit={categoryFormik.handleSubmit}>
                <h3 className='mb-1'>{categoryId !== undefined && categoryId !== "" ? "Edit" : "Create"} Category</h3>
                <div className="w-100 form-floating">
                    <input name='title' type="text" className="form-control" id="floatingInput" placeholder="Enter New Category Name" value={categoryFormik.values.title} onChange={categoryFormik.handleChange} onBlur={categoryFormik.handleBlur} />
                    <label htmlFor="floatingInput">Enter New Category Name</label>
                    {categoryFormik.touched.title && categoryFormik.errors.title ? (
                        <div className='auth-error'>&nbsp;&nbsp;{categoryFormik.errors.title}</div>
                    ) : null}
                </div>
                {categoryId === undefined || categoryId === "" ? <button type="submit" className="button d-flex align-items-center justify-content-center"><IoAdd className='fs-4' />&nbsp;Add Category</button> : <button type="submit" className="button d-flex align-items-center justify-content-center"><GrUpdate className='fs-6' />&nbsp;Update Category</button>}
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddCategory;