import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../features/orders/orderSlice';
import { ToastContainer } from 'react-toastify';

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
    
    const statuses = ['Ordered', "Shipping", 'Out-of-Delivery', 'Delivered'];
    const dispatch = useDispatch();
    const upadatedOrder = useSelector(state => state.orders.upadatedOrder)
    const handleChangeStatus = (status, id) => {
        const data = {
            id: id,
            status: status
        };        
        dispatch(updateOrderStatus(data));
    }

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch,upadatedOrder]);

    const orderState = useSelector((state) => state.orders.orders);

    const tabledata = [];
    if(orderState){
        for (let i = 0; i < orderState?.length; i++) {
            tabledata.push({
                key: i+1,
                orderList: <ul className='list-unstyled'>
                  {orderState[i]?.orderItems.map((product) => <li key={product._id} className='mb-1'>{product.product.title}&nbsp; (₹<b>{product.price*0.72}</b> x <b>{product.quantity})</b></li>)}
                </ul>,
                date: orderState[i].createdAt.replace('T', ' ').replace('Z', ' ').replace(/\.(\d{3})/g, ''),
                orderedBy: `${orderState[i]?.shippingInfo.firstname} ${orderState[i].shippingInfo.lastname}`,
                amount: <>₹<b>{orderState[i]?.totalPriceAfterDiscount}</b></>,
                // status: orderState[i]?.orderStatus,  
                status: <div className="dropdown">
                    <select value={orderState[i]?.orderStatus} style={{ minWidth: "100%", padding: "2px 10px", backgroundColor: "white", borderRadius: "3px" }} onChange={(e) => handleChangeStatus(e.target.value, orderState[i]._id)}>
                        {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>,              
              });
        }
    }

    return (
        <>
            <ToastContainer/>
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