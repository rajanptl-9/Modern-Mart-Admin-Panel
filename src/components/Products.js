import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../features/products/productSlice';
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
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Products = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const deletedProduct = useSelector(state => state.products.deletedProduct);

    useEffect(() => {
        setDeleteId(null);
        dispatch(getProducts({limit:Infinity}));
    }, [dispatch,deletedProduct])    
    
    const handleDeleteProduct = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    }
    
    const confirmDelete = () => {
        setModalOpen(false);
        dispatch(deleteProduct(deleteId));
    }
    
    const productState = useSelector(state => state?.products?.products?.prod);
    
    
    const tabledata = [];
    if (productState) {
        for (let i = 0; i < productState?.length; i++) {      
            tabledata.push({
                key: i,
                name: productState[i]?.title,
                brand: productState[i]?.brand.title,
                price: productState[i]?.price,
                quantity: productState[i]?.quantity,
                category: productState[i]?.category.title,
                action: <>
                    <Link to={`/admin/add-product/${productState[i]?._id}`} className="text-decoration-none text-primary"><FaRegEdit className='me-2 fs-6' /></Link>
                    <button className="text-decoration-none  border-0 bg-white text-danger" onClick={() => handleDeleteProduct(productState[i]?._id)}><MdOutlineDeleteForever className='me-2 fs-5' /></button>
                </>,
            });
        }
    }
    
    return (
        <>
            <ToastContainer/>
            <div className='w-100'>
                <div style={{ marginBottom: 16, }} className='d-flex justify-content-between align-items-center gap-16 flex-wrap bg-white p-3 rounded-3'>
                    <h2 className="mb-0">Products</h2>
                </div>
                <Table columns={columns} dataSource={tabledata} />
                <Modal
                    title="Confirm Product Delete"
                    centered
                    open={modalOpen}
                    onOk={() => confirmDelete()}
                    onCancel={() => {setModalOpen(false); setDeleteId(null)}}
                >
                    <p>Are you sure want to delete product?</p>
                </Modal>
            </div>
        </>
    )
}

export default Products;
