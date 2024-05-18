import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { forgotPassword } from '../features/auth/authSlice';
import { toast, Bounce, ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const schema = yup.object().shape({
        email: yup.string().email().required("Email is Required!")
    });

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(forgotPassword(values));
        }
    });

    useEffect(() => {
        if (!authState.isLoading) {
            if (authState.isSuccess && !authState.isError) {
                toast.success('✓ Email sent successfully!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } else if (authState.isError && !authState.isSuccess) {
                toast.error('✗ Failed password reset!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        }
        //eslint-disable-next-line
    }, [authState.isError, authState.isSuccess, authState.isLoading]);

    return (
        <>
            <ToastContainer />
            <section className="auth-wrapper py-5">
                <div className="container-xxl py-5">
                    <div className="rowpy-5">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="auth-card d-flex flex-column py-4 px-5 gap-10">
                                <h2 className='text-center'>Forgot Password</h2>
                                <p className="mb-2 text-center">We will send you an email to change the password</p>
                                <form action="" onSubmit={formik.handleSubmit}>
                                    <div className='position-relative'><input type="email" name="email" id="" className='w-100 mt-2 mb-4 form-control' placeholder='Email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className='auth-error'>&nbsp;&nbsp;{formik.errors.email}</div>
                                        ) : null}</div>
                                    <div className="d-flex flex-column align-items-center gap-20">
                                        <button type='submit' className="button">Submit</button>
                                        <Link to={"/"}><button type='reset' className="btn">Cancel</button></Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForgotPassword;