import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoupon, getCoupons } from '../features/coupons/couponSlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";

const columns = [
    {
        title: 'S No.',
        dataIndex: 'key',
        render: (text, record, index) => index + 1,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Expiry Date',
        dataIndex: 'date',
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        sorter: (a, b) => a.discount - b.discount,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Coupons = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const deletedCoupon = useSelector(state => state.coupons.deletedCoupon);

    useEffect(() => {
        dispatch(getCoupons());
    }, [dispatch,deletedCoupon])

    const handleDeleteCoupon = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    }
    
    const confirmDelete = () => {
        setModalOpen(false);
        dispatch(deleteCoupon(deleteId));
    }

    
    const couponState = useSelector((state) => state.coupons.coupons);
    const tabledata = [];
    if(couponState){
        for (let i = 0; i < couponState.length; i++) {
            tabledata.push({
                key: i,
                name: couponState[i].name,
                date: couponState[i].expiry,
                discount: couponState[i].discount,
                action: <>
                    <Link to={`/admin/add-coupon/${couponState[i]._id}`} className="text-decoration-none text-primary"><FaRegEdit className='me-2 fs-6' /></Link>
                    <button className="text-decoration-none text-danger bg-white  border-0" onClick={() => handleDeleteCoupon(couponState[i]._id)}><MdOutlineDeleteForever className='me-2 fs-5' /></button>
                </>,
            });
        }
    }
    return (
        <>
            <div className='w-100'>
                <div
                    style={{
                        marginBottom: 16,
                    }}
                    className='d-flex justify-content-between align-items-center gap-16 flex-wrap bg-white p-3 rounded-3'
                >
                    <h2 className="mb-0">Coupons</h2>
                </div>
                <Table columns={columns} dataSource={tabledata} />
                <Modal
                    title="Confirm Coupons Delete"
                    centered
                    open={modalOpen}
                    onOk={() => confirmDelete()}
                    onCancel={() => {setModalOpen(false); setDeleteId(null)}}
                >
                    <p>Are you sure want to delete coupon?</p>
                </Modal>
            </div>
        </>
    )
}

export default Coupons;