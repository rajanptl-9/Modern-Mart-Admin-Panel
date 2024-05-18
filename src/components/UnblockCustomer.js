import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
import { getBlockedCustomers, unblockCustomer } from '../features/customers/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CgUnblock  } from "react-icons/cg";
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
        defaultSortOrder: "descend",
        sorter: (a,b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const BlockCustomer = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [blockId, setBlockId] = useState(null);

    const unblockedCustomer = useSelector(state => state.customers.unblockedCustomer);


    useEffect(() => {
        dispatch(getBlockedCustomers());
    }, [dispatch, unblockedCustomer]);

    const handleUnblockCustomer = (id) => {
        setBlockId(id);
        setModalOpen(true);
    }
    
    const confirmDelete = () => {
        setModalOpen(false);
        dispatch(unblockCustomer(blockId));
    }

    const customerState = useSelector((state) => state.customers.customers);
    const tabledata = [];
    //eslint-disable-next-line
    if(customerState){
        //eslint-disable-next-line
        customerState.map((customer, index) => {
            tabledata.push({
                key: index,
                name: `${customer.firstname} ${customer.lastname}`,
                phone: customer.mobile,
                email: customer.email,
                action: <button className='me-2 bg-white border-0 text-info d-flex align-items-center' onClick={() => handleUnblockCustomer(customer._id)}>
                    <CgUnblock  className='fs-5' /> Unblock
                </button>
            });
        });
    }
    return (
        <>
            <ToastContainer/>
            <div className='w-100'>
                <div style={{ marginBottom: 16, }} className='d-flex justify-content-between align-items-center gap-16 flex-wrap bg-white p-3 rounded-3'>
                    <h2 className="mb-0">Blocked List</h2> 
                </div>
                <Table columns={columns} dataSource={tabledata} />
                <Modal
                    title="Confirm Block User"
                    centered
                    open={modalOpen}
                    onOk={() => confirmDelete()}
                    onCancel={() => {setModalOpen(false); setBlockId(null)}}
                >
                    <p>Are you sure want to block user?</p>
                </Modal>
            </div>
        </>
    )
}

export default BlockCustomer;