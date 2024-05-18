import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
import { deleteCategory, getCategories } from '../features/categories/categorySlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
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

const Categories = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const deletedCategory = useSelector(state => state.categories.deletedCategory);

    useEffect(() => {
        setDeleteId(null);
        dispatch(getCategories());
    }, [dispatch,deletedCategory])

    const handleDeleteCategroy = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    }
    
    const confirmDelete = () => {
        setModalOpen(false);
        dispatch(deleteCategory(deleteId));
    }

    
    const categoryState = useSelector((state) => state.categories.categories);
    const tabledata = [];
    if(categoryState){
        for (let i = 0; i < categoryState.length; i++) {
            tabledata.push({
                key: i,
                name: categoryState[i].title,
                createDate: categoryState[i].createdAt.replace('T', ' ').replace('Z', ' ').replace(/\.(\d{3})/g, ''),
                action: <>
                    <Link to={`/admin/add-category/${categoryState[i]._id}`} className="text-decoration-none text-primary"><FaRegEdit className='me-2 fs-6' /></Link>
                    <button className="text-decoration-none border-0 bg-white text-danger" onClick={() => handleDeleteCategroy(categoryState[i]._id)}><MdOutlineDeleteForever className='me-2 fs-5' /></button>
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
                    <h2 className="mb-0">Categories</h2>

                </div>
                <Table columns={columns} dataSource={tabledata} />
                <Modal
                    title="Confirm Category Delete"
                    centered
                    open={modalOpen}
                    onOk={() => confirmDelete()}
                    onCancel={() => {setModalOpen(false); setDeleteId(null)}}
                >
                    <p>Are you sure want to delete category?</p>
                </Modal>
            </div>
        </>
    )
}

export default Categories;