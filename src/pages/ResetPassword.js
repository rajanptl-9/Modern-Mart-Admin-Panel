import { React, useEffect, useState } from 'react';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/auth/authSlice';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const [seePassword, setSeePassword] = useState(false);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
    const location = useLocation();
    const token = location.pathname.split('/')[2];
    const navigate = useNavigate();

    const handlePasswordEye = () => {
        setSeePassword(!seePassword);
    }
    const handleConfirmPasswordEye = () => {
        setSeeConfirmPassword(!seeConfirmPassword);
    }

    const schema = yup.object().shape({
        password: yup.string().required("Password is required!"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match!').required("Confirm Password is required!")
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            const data = {
                token: token,
                password: values.password
            }
            dispatch(resetPassword(data));
        }
    });

    useEffect(() => {
        if (!authState.isLoading) {
            if (authState.isSuccess && !authState.isError) {
                toast.success('✓ Password changed successfully!', {
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
                setTimeout(() => {
                    navigate('/')
                }, 2000);
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
                                <h2 className='text-center'>Reset Password</h2>
                                <p className="mb-2 text-center">Please enter your new password</p>
                                <form action="" onSubmit={formik.handleSubmit}>
                                    <div className='position-relative'><input type={seePassword ? "text" : "password"} name="password" id="" className='w-100 mb-3 form-control' placeholder='Type new password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {seePassword ? <span className='password-eye-auth'><VscEye onClick={handlePasswordEye} /></span> : <span className='password-eye-auth'><VscEyeClosed onClick={handlePasswordEye} /></span>}
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className='auth-error'>&nbsp;&nbsp;{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className='position-relative'><input type={seeConfirmPassword ? "text" : "password"} name="confirmPassword" id="" className='w-100 mb-4 form-control' placeholder='Re-type new password' value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {seeConfirmPassword ? <span className='password-eye-auth'><VscEye onClick={handleConfirmPasswordEye} /></span> : <span className='password-eye-auth'><VscEyeClosed onClick={handleConfirmPasswordEye} /></span>}
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                            <div className='auth-error'>&nbsp;&nbsp;{formik.errors.confirmPassword}</div>
                                        ) : null}
                                    </div>
                                    <div className="d-flex justify-content-center gap-20">
                                        <div className='text-black w-100'><button type='submit' className="button">Submit</button></div>
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

export default ResetPassword