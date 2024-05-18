import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEnquiry, getEnquiries, updateEnquiry } from '../features/enquiries/enquirySlice';
import { MdOutlineDeleteForever } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const columns = [
    {
        title: 'S No.',
        dataIndex: 'key',
        render: (text, record, index) => index + 1,
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Enquiries = () => {
    const dispatch = useDispatch();

    const statuses = ['Submitted', "Contacted", 'In Progress', 'Resolved'];
    const { enquiryData, deletedEnquiry } = useSelector((state) => state.enquiries);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        dispatch(getEnquiries());
    }, [dispatch, enquiryData, deletedEnquiry]);

    const handleChangeStatus = (status, id) => {
        const data = {
            id: id,
            data: {
                status: status
            }
        };
        dispatch(updateEnquiry(data));
    }

    const confirmDelete = () => {
        setModalOpen(false);
        dispatch(deleteEnquiry(deleteId));

    }

    const handleDeleteEnquiry = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    }

    const enquiryState = useSelector((state) => state.enquiries.enquiries);
    const tabledata = [];
    if (enquiryState) {
        for (let i = 0; i < enquiryState.length; i++) {
            tabledata.push({
                key: i,
                name: enquiryState[i].name,
                email: enquiryState[i].email,
                mobile: "+91 " + enquiryState[i].mobile,
                status: <div className="dropdown">
                    <select value={enquiryState[i].status} style={{ minWidth: "100%", padding: "2px 10px", backgroundColor: "white", borderRadius: "3px" }} onChange={(e) => handleChangeStatus(e.target.value, enquiryState[i]._id)}>
                        {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>,
                action: <>
                    <Link to={`/admin/enquiry-list/${enquiryState[i]._id}`} className="border-0 cursor-pointer text-decoration-none text-primary p-0 bg-white"><LuEye className='me-2 fs-5 text-secondary' /></Link>
                    <button className="border-0 cursor-pointer text-decoration-none text-danger p-0 bg-white" onClick={() => handleDeleteEnquiry(enquiryState[i]._id)}><MdOutlineDeleteForever className='me-2 fs-5' /></button>
                </>,
            });
        }
    }

    return (
        <>
            <ToastContainer/>
            <div className='w-100'>
                <div style={{ marginBottom: 16, }} className='d-flex justify-content-between align-items-center gap-16 flex-wrap bg-white p-3 rounded-3'>
                    <h2 className="mb-0">Enquiries</h2>
                </div>
                <Table columns={columns} dataSource={tabledata} />
                <Modal
                    title="Confirm Delete Enquiry"
                    centered
                    open={modalOpen}
                    onOk={() => confirmDelete(deleteId)}
                    onCancel={() => setModalOpen(false)}>
                    <p>Are you sure want to delete enquiry?</p>
                </Modal>
            </div>
        </>
    )
}

export default Enquiries;