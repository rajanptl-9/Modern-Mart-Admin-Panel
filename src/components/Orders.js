import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/orders/orderSlice';

const columns = [
    {
        title: 'S No.',
        dataIndex: 'key',
        render: (text, record, index) => index + 1,
    },
    {
        title: 'Order List',
        dataIndex: 'orderList',
    },
    {
        title: 'Date & Time',
        dataIndex: 'date',
    },
    {
        title: 'Customer info',
        dataIndex: 'orderedBy',
    },
    {
        title: 'Total Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    // {
    //     title: 'Action',
    //     dataIndex: 'action',
    // },
];


const Orders = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const orderState = useSelector((state) => state.orders.orders);

    const tabledata = [];
    if(orderState){
        for (let i = 0; i < orderState.length; i++) {
            let totalAmount = 0;
            for (let j = 0; j < orderState[i].products.length; j++) {
                totalAmount += orderState[i].products[j].product.price * orderState[i].products[j].count;
            }
            tabledata.push({
                key: i,
                orderList: <ul className='list-unstyled'>
                    {orderState[i].products.map((product) => <li key={`${product.product.slug}${product.count}`} className='mb-1'>{product.product.title}&nbsp; ({product.product.price}x{product.count})</li>)}
                </ul>,
                date: orderState[i].createdAt.replace('T', ' ').replace('Z', ' ').replace(/\.(\d{3})/g, ''),
                orderedBy: `${orderState[i].orderedBy.firstname} ${orderState[i].orderedBy.lastname}`,
                amount: totalAmount,
                status: orderState[i].orderStatus,
                // action: <>
                //     <Link to="" className="text-decoration-none text-danger"><MdOutlineDeleteForever className='me-2 fs-5' /></Link>
                // </>,
            });
        }
    }

    return (
        <>
            <div className='w-100'>
                <div style={{ marginBottom: 16, }} className='d-flex justify-content-between align-items-center gap-16 flex-wrap bg-white p-3 rounded-3'>
                    <h2 className="mb-0">Orders</h2>
                </div>
                <Table columns={columns} dataSource={tabledata} />
            </div>
        </>
    )
}

export default Orders;