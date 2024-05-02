import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createBrand, getOneBrand, resetState, updateBrand } from '../features/brands/brandSlice';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoAdd } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";

const AddBrand = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const createBrandState = useSelector((state) => state.brands);
    const brandId = location.pathname.split('/')[3];
    const { brandName: btitle } = useSelector((state) => state.brands) || { brandName: "" };

    const brandSchema = yup.object().shape({
        title: yup.string().required("Enter brand title"),
    });

    const brandFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: btitle || '',
        },
        validationSchema: brandSchema,
        onSubmit: values => {
            if (brandId !== undefined && brandId !== "") {
                const data = {
                    id: brandId,
                    data: {
                        title: values.title
                    }
                }
                dispatch(updateBrand(data));
            } else {
                dispatch(createBrand(values));
            }
        },
    });

    useEffect(() => {
        brandFormik.resetForm();
        if (brandId !== undefined && brandId !== "") {
            dispatch(getOneBrand(brandId));
        }else{
            dispatch(resetState());
        }
        //eslint-disable-next-line
    }, [brandId]);

    useEffect(() => {
        if (createBrandState.isSuccess && !createBrandState.isError) {
            if (createBrandState.newBrand !== null || createBrandState.updatedBrand !== null) {
                if (brandId === undefined || brandId === "") {
                    toast('✔ Brand created successfully!', {
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
                } else if (brandId !== undefined && brandId !== "") {                    
                    toast.info('✔ Brand updated successfully! Redirecting...', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        onClick : () => {
                            dispatch(resetState());
                            navigate("/admin/brand-list");
                        }
                    });
                    dispatch(resetState());
                    setTimeout(() => {
                        navigate("/admin/brand-list");
                    }, 2000);
                }
                brandFormik.resetForm();
            }
        } else if (createBrandState.isError && !createBrandState.isSuccess) {
            let message = "";
            if (createBrandState.message === "Update failed!") {
                message = '✖ Brand update failed! Please try again.';
            } else if (createBrandState.message === "Creation failed!") {
                message = '✖ Brand creation failed! Please try again.';
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
    }, [createBrandState.isSuccess, createBrandState.isError, createBrandState.isLoading]);

    return (
        <div className='add-form-list d-flex flex-column gap-16'>
            <form action='' className="box-container w-100 d-flex flex-column flex-grow-1 bg-white rounded-3 p-3 align-items-center gap-16" onSubmit={brandFormik.handleSubmit}>
                <h3 className='mb-1'>{brandId !== undefined && brandId !== "" ? "Edit" : "Create"} Brand</h3>
                <div className="w-100 form-floating">
                    <input type="text" name='title' className="form-control" id="floatingInput" placeholder="Enter New Brand Name" value={brandFormik.values.title} onChange={brandFormik.handleChange} onBlur={brandFormik.handleBlur} />
                    <label htmlFor="floatingInput">Enter New Brand Name</label>
                    {brandFormik.touched.title && brandFormik.errors.title ? (
                        <div className='auth-error'>&nbsp;&nbsp;{brandFormik.errors.title}</div>
                    ) : null}
                </div>
                {brandId === undefined || brandId === "" ? <button type="submit" className="button d-flex align-items-center justify-content-center"><IoAdd className='fs-4' />&nbsp;Add Brand</button> : <button type="submit" className="button d-flex align-items-center justify-content-center"><GrUpdate className='fs-6' />&nbsp;Update Brand</button>}
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddBrand;