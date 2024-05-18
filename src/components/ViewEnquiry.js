import React, { useEffect, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOneEnquiry, resetState, updateEnquiry } from '../features/enquiries/enquirySlice';
import { ToastContainer } from 'react-toastify';

const ViewEnquiry = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const statuses = ['Submitted', "Contacted", 'In Progress', 'Resolved'];
    const enquiryId = location.pathname.split("/")[3];
    const enquiryData = useSelector((state) => state.enquiries.enquiryData);
    const { name: ename, email: eemail, mobile: emobile, comment: ecomment, status: estatus } = enquiryData ? enquiryData : { name: "", email: "", mobile: "", comment: "", status: "Submitted" };
    const [currStatus, setCurrStatus] = useState("Submitted");

    useEffect(() => {
        setCurrStatus(estatus);
    } , [estatus]);
    
    useEffect(() => {
        dispatch(resetState());
        if (enquiryId !== undefined && enquiryId !== null) {
            dispatch(getOneEnquiry(enquiryId));
        } else {
            navigate('/enquiry-list');
        }
    }, [enquiryId, dispatch, navigate]);

    const handleStatusChange = (e) => {
        setCurrStatus(e.target.value);
        const data = {
            id: enquiryId,
            data: {
                status: e.target.value
            }
        };
        dispatch(updateEnquiry(data));
        dispatch(resetState());
    };
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <ToastContainer/>
            <div className='w-100'>
                <div
                    style={{
                        marginBottom: 16,
                    }}
                    className='d-flex justify-content-between align-items-center gap-16 flex-wrap bg-white p-3 rounded-3'
                >
                    <h2 className="mb-0">Enquiry Details</h2>
                </div>
                <div className='w-100'>
                    <div className='bg-white p-3 rounded-3'>
                        <div className='d-flex flex-column justify-content-start align-items-start gap-16 flex-wrap'>
                            <p>Name: {ename}</p>
                            <p>Mobile: {emobile}</p>
                            <p>Email: {eemail}</p>
                            <p>Comments: {ecomment}</p>
                            <p>Status: {estatus}</p>
                            <p>Change Status: &nbsp;
                                <select value={currStatus} onChange={handleStatusChange} style={{ width: "140px", padding: "2px 8px" }}>
                                    {statuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))} 
                                </select>
                            </p>
                        </div>
                        <hr />
                        <button onClick={handleGoBack} className='bg-white border-0 d-flex align-items-center'><IoArrowBack className='fs-5' /> &nbsp; Go Back</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewEnquiry;