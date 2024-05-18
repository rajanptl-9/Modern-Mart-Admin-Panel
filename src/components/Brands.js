import React, { useState,useEffect } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands } from '../features/brands/brandSlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
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
        sorter: (a,b) => a.name.localeCompare(b.name),        
    },
    {
        title: 'Create Date',
        dataIndex: 'createDate',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Brands = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const deletedBrand= useSelector(state => state.brands.deletedBrand);

    useEffect(() => {
        setDeleteId(null);
        dispatch(getBrands());
    }, [dispatch,deletedBrand]);

    const handleDeleteProduct = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    }
    
    const confirmDelete = () => {
        setModalOpen(false);
        dispatch(deleteBrand(deleteId));
    }

    const brandState = useSelector((state) => state.brands.brands);
    const tabledata = [];
    if(brandState){
        for (let i = 0; i < brandState.length; i++) {
            tabledata.push({
                key: i,
                name: brandState[i].title,
                createDate: brandState[i].createdAt.replace('T', '\n').replace('Z', ' ').replace(/\.(\d{3})/g, ''),
                action: <>
                    <Link to={`/admin/add-brand/${brandState[i]._id}`} className="text-decoration-none text-primary"><FaRegEdit className='me-2 fs-6' /></Link>
                    <button className="text-decoration-none  border-0 bg-white text-danger" onClick={() => handleDeleteProduct(brandState[i]._id)}><MdOutlineDeleteForever className='me-2 fs-5' /></button>
                </>,
            });
        }
    }
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
                    <h2 className="mb-0">Brands</h2>
                </div>
                <Table columns={columns} dataSource={tabledata} />
                <Modal
                    title="Confirm Brand Delete"
                    centered
                    open={modalOpen}
                    onOk={() => confirmDelete()}
                    onCancel={() => {setModalOpen(false); setDeleteId(null)}}
                >
                    <p>Are you sure want to delete brand?</p>
                </Modal>
            </div>
        </>
    )
}

export default Brands;