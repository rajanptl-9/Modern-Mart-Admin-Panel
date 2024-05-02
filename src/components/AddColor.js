import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createColor, getOneColor, resetState, updateColor } from '../features/colors/colorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoAdd } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";

const AddColor = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const createColorState = useSelector((state) => state.colors);
    const colorId = location.pathname.split('/')[3];
    const { colorName: ctitle } = useSelector((state) => state.colors) || { colorName: "" };
    
    const colorSchema = yup.object().shape({
        title: yup.string().required("Enter color title"),
    });

    const colorFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: ctitle || '',
        },
        validationSchema: colorSchema,
        onSubmit: values => {
            if (colorId !== undefined && colorId !== "") {
                const data = {
                    id: colorId,
                    data: {
                        title: values.title
                    }
                };
                dispatch(updateColor(data));
            } else {
                dispatch(createColor(values));
            }
        },
    });

    useEffect(() => {
        colorFormik.resetForm();
        if(colorId !== undefined && colorId !== "") {
            dispatch(getOneColor(colorId));
        }else{
            dispatch(resetState());
        }
        //eslint-disable-next-line
    } , [colorId]);

    useEffect(() => {
        if (createColorState.isSuccess && !createColorState.isError) {
            if (createColorState.newColor !== null || createColorState.updatedColor !== null) {
                if (colorId === undefined || colorId === "") {
                    toast('✔ Color created successfully!', {
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
                } else if (colorId !== undefined && colorId !== "") {
                    toast.info('✔ Color updated successfully! Redirecting...', {
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
                            navigate("/admin/Color-list");
                        }
                    });
                    dispatch(resetState());
                    setTimeout(() => {
                        navigate("/admin/Color-list");
                    }, 2000);
                }
                colorFormik.resetForm();
            }
        } else if (createColorState.isError && !createColorState.isSuccess) {
            let message = "";
            if (createColorState.message === "Update failed!") {
                message = '✖ Color update failed! Please try again.';
            } else if (createColorState.message === "Creation failed!") {
                message = '✖ Color creation failed! Please try again.';
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
    }, [createColorState.isSuccess, createColorState.isError, createColorState.isLoading]);

    return (
        <div className='add-form-list d-flex flex-column gap-16'>
            <form action='' className="box-container w-100 d-flex flex-column flex-grow-1 bg-white rounded-3 p-3 align-items-center gap-16" onSubmit={colorFormik.handleSubmit}>
                <h3 className='mb-1'>{colorId !== undefined && colorId !== "" ? "Edit" : "Create"} Color</h3>
                <div className="w-100 form-floating">
                    <input name="title" type="text" className="form-control" id="floatingInput" placeholder="Enter New Color Name" value={colorFormik.values.title} onChange={colorFormik.handleChange} onBlur={colorFormik.handleBlur}/>
                    <label htmlFor="floatingInput">Enter New Color Name</label>
                    {colorFormik.touched.title && colorFormik.errors.title ? (
                        <div className='auth-error'>&nbsp;&nbsp;{colorFormik.errors.title}</div>
                    ) : null}
                </div>
                {colorId === undefined || colorId === "" ? <button type="submit" className="button d-flex align-items-center justify-content-center"><IoAdd className='fs-4' />&nbsp;Add Color</button> : <button type="submit" className="button d-flex align-items-center justify-content-center"><GrUpdate className='fs-6' />&nbsp;Update Color</button>}
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddColor;