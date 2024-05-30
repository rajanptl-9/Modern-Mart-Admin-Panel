import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetState } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [seePassword, setSeePassword] = useState(false);
    const [success, setSuccess] = useState(0);
    const { isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    useEffect(() => {
        if (user) {
            setSuccess(1);
            setTimeout(() => {
                window.location.replace("/dashboard");
            }, 1000);
        } else if (isError && !isSuccess) {
            setSuccess(2);
        }
    }, [user, isLoading, isError, isSuccess, message, navigate]);

    useEffect(() => {
        if(success === 2){
            dispatch(resetState());
            setTimeout(() => {
                setSuccess(0);
            }, 3000);
        }
    }, [success, dispatch]);

    const loginSchema = yup.object().shape({
        email: yup.string().email("Enter valid E-mail").required("Enter e-mail address"),
        password: yup.string().min(6, "Min. 6 chars required").max(20, "Max. 20 chars allowed").required("Password is required")
    });

    const handlePasswordEye = () => {
        setSeePassword(!seePassword);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            dispatch(login(values));
        },
    });

    return (
        <>
            <section className="auth-wrapper py-5">
                <div className="container-xxl py-5">
                    <div className="rowpy-5">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="auth-card d-flex flex-column py-4 px-5 gap-10">
                                <h2 className='text-center mb-1'>Login</h2>
                                <form action="" onSubmit={formik.handleSubmit}>
                                    <div><input type="email" name="email" id="email" className='w-100 mt-3 form-control' placeholder='Email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className='auth-error'>&nbsp;&nbsp;{formik.errors.email}</div>
                                        ) : null}</div>
                                    <div className='position-relative mb-3'><input type={seePassword ? "text" : "password"} name="password" id="password" className='w-100 mt-3 form-control' placeholder='Password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                        {seePassword ? <span className='password-eye-auth'><VscEye onClick={handlePasswordEye} /></span> : <span className='password-eye-auth'><VscEyeClosed onClick={handlePasswordEye} /></span>}
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className='auth-error'>&nbsp;&nbsp;{formik.errors.password}</div>
                                        ) : null}</div>
                                    <p className="mb-4"><Link to="/forgot-password">Forgot-password?</Link></p>
                                    <div className="d-flex justify-content-center gap-20">
                                        <button type='submit' className="button">Log In</button>
                                    </div>
                                </form>
                            </div>
                            {success === 1 && <div className="alert alert-success d-flex justify-content-center" role="alert">
                                {`Login Successfully. Welcome `}&nbsp; <b>{`${user.firstname} ${user.lastname}!`}</b>
                            </div>}
                            {success === 2 && <div className="alert alert-danger d-flex justify-content-center" role="alert">
                                {"Login Failed. You are not admin!"}
                            </div>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login