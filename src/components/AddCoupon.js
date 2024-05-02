import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, getOneCoupon, updateCoupon, resetState } from '../features/coupons/couponSlice';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoAdd } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";

const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const createCouponState = useSelector((state) => state.coupons);
    const couponId = location.pathname.split('/')[3];
    const couponData = useSelector((state) => state.coupons.couponData);
    const { name: cname, discount: cdiscount, expiry: cexpiry } = couponData || { name: "", discount: "", expiry: "" };
    const couponSchema = yup.object().shape({
        name: yup.string().required("Enter Coupon Name"),
        discount: yup.number().required("Enter Discount").max(100, "Discount should be less than 100").min(0, "Discount should be greater than 0"),
        expiry: yup.date().required("Enter Expiry Date").min(new Date(), "Expiry date should be greater than today's date"),
    });

    const couponFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: cname || '',
            discount: cdiscount || '',
            expiry: cexpiry ? new Date(cexpiry).toISOString().slice(0,10) : new Date().toISOString().slice(0,10),
        },
        validationSchema: couponSchema,
        onSubmit: values => {
            if (couponId !== undefined && couponId !== "") {
                const data = {
                    id: couponId,
                    data: {
                        name: values.name,
                        discount: values.discount,
                        expiry: values.expiry
                    }
                };
                dispatch(updateCoupon(data));
            } else {
                couponFormik.values.name = couponFormik.values.name.toUpperCase().replace(" ", "");
                dispatch(createCoupon(values));
            }
        },
    });

    useEffect(() => {
        couponFormik.resetForm();
        if (couponId !== undefined && couponId !== "") {
            dispatch(getOneCoupon(couponId));
        }else{
            dispatch(resetState());
        }
        //eslint-disable-next-line
    }, [couponId]);

    useEffect(() => {
        if (createCouponState.isSuccess && !createCouponState.isError) {
            if (createCouponState.newCoupon !== null || createCouponState.updatedCoupon !== null) {
                if (couponId === undefined || couponId === "") {
                    toast('✔ Coupon created successfully!', {
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
                } else if (couponId !== undefined && couponId !== "") {
                    toast.info('✔ Coupon updated successfully! Redirecting...', {
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
                            navigate("/admin/Coupon-list");
                        }
                    });
                    dispatch(resetState());
                    setTimeout(() => {
                        navigate("/admin/Coupon-list");
                    }, 2000);
                }
                couponFormik.resetForm();
                dispatch(resetState());
            }
        } else if (createCouponState.isError && !createCouponState.isSuccess) {
            let message = "";
            if (createCouponState.message === "Update failed!") {
                message = '✖ Coupon update failed! Please try again.';
            } else if (createCouponState.message === "Creation failed!") {
                message = '✖ Coupon creation failed! Please try again.';
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
    }, [createCouponState.isSuccess, createCouponState.isError, createCouponState.isLoading]);
    
    return (
        <div className='add-form-list d-flex flex-column gap-16'>
            <form action='' className="box-container w-100 d-flex flex-column flex-grow-1 bg-white rounded-3 p-3 align-items-center gap-16" onSubmit={couponFormik.handleSubmit}>
                <h3 className='mb-1'>{couponId !== undefined && couponId !== "" ? "Edit" : "Create"} Coupon</h3>
                <div className="w-100 form-floating">
                    <input name='name' type="text" className="form-control" id="inputTitle" placeholder="Enter New Product Name" value={couponFormik.values.name.toUpperCase().replace(" ", "")} onChange={couponFormik.handleChange} onBlur={couponFormik.handleBlur} />
                    <label htmlFor="inputTitle">Enter Coupon Title</label>
                    {couponFormik.touched.name && couponFormik.errors.name ? (
                        <div className='auth-error'>&nbsp;&nbsp;{couponFormik.errors.name}</div>
                    ) : null}
                </div>
                <div className="w-100 d-flex flex-wrap gap-16 w-100">
                    <div className="form-floating flex-grow-1">
                        <input name='discount' type="number" className="form-control" id="inputPrice" placeholder="Enter Product Price" min={0} max={100} value={couponFormik.values.discount} onChange={couponFormik.handleChange} onBlur={couponFormik.handleBlur} />
                        <label htmlFor="inputPrice">Enter Discount (%)</label>
                        {couponFormik.touched.discount && couponFormik.errors.discount ? (
                            <div className='auth-error'>&nbsp;&nbsp;{couponFormik.errors.discount}</div>
                        ) : null}
                    </div>
                    <div className="form-floating flex-grow-1">
                        <input name='expiry' type="date" className="form-control" id="inputQuan" placeholder="Enter Product Quantity" value={couponFormik.values.expiry} onChange={couponFormik.handleChange} onBlur={couponFormik.handleBlur} />
                        <label htmlFor="inputQuan">Enter Expriry Date</label>
                    </div>
                </div>
                {couponId === undefined || couponId === "" ? <button type="submit" className="button d-flex align-items-center justify-content-center"><IoAdd className='fs-4' />&nbsp;Add Coupon</button> : <button type="submit" className="button d-flex align-items-center justify-content-center"><GrUpdate className='fs-6' />&nbsp;Update Coupon</button>}
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddCoupon