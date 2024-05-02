import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from '@ant-design/plots';
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { getOrders } from '../features/orders/orderSlice';
import CommonTable from './CommonTable';

const columns = [
  {
    title: 'S No.',
    dataIndex: 'key',
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
  //   title: 'Action',
  //   dataIndex: 'action',
  // },
];

const Dashboard = () => {
  const dispatch = useDispatch();

  const data = [
    {
      type: 'Jan',
      sales: 38,
    },
    {
      type: 'Feb',
      sales: 52,
    },
    {
      type: 'Mar',
      sales: 61,
    },
    {
      type: 'Apr',
      sales: 145,
    },
    {
      type: 'May',
      sales: 48,
    },
    {
      type: 'Jun',
      sales: 38,
    },
    {
      type: 'Jul',
      sales: 26,
    },
    {
      type: 'Aug',
      sales: 79,
    },
    {
      type: 'Sep',
      sales: 64,
    },
    {
      type: 'Oct',
      sales: 82,
    },
    {
      type: 'Nov',
      sales: 46,
    },
    {
      type: 'Dec',
      sales: 24,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return "#dfd212";
    },
    label: {
      position: 'bottom',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Months',
      },
      sales: {
        alias: 'Income',
      },
    },
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.orders);
  const orders = orderState.orders;

  const tabledata = [];
  if(orders){
    for (let i = 0; i < orders.length; i++) {
      let totalAmount = 0;
      for (let j = 0; j < orders[i].products.length; j++) {  
        totalAmount += orders[i].products[j].product.price * orders[i].products[j].count;
      }
      tabledata.push({
        key: i+1,
        orderList: <ul className='list-unstyled'>
          {orders[i].products.map((product) => <li key={product._id} className='mb-1'>{product.product.title}&nbsp; ({product.product.price}x{product.count})</li>)}
        </ul>,
        date: orders[i].createdAt.replace('T', ' ').replace('Z', ' ').replace(/\.(\d{3})/g, ''),
        orderedBy: `${orders[i].orderedBy.firstname} ${orders[i].orderedBy.lastname}`,
        amount: totalAmount,
        status: orders[i].orderStatus,
        action: <>
          <Link to="" className="text-decoration-none text-primary"><FaRegEdit className='me-2 fs-6' /></Link>
          <Link to="" className="text-decoration-none text-danger"><MdOutlineDeleteForever className='me-2 fs-5' /></Link>
        </>,
      });
    }
  }

  return (
    <>
      <div className="dashboard-wrapper">
        <div className="w-100 d-flex justify-content-between align-items-center gap-16 flex-wrap">
          <div className="d-flex flex-grow-1 flex-shrink-1 justify-content-between align-items-end bg-white border-grey p-3 rounded-3">
            <div className='d-flex flex-column me-3'>
              <h5 className="mb-2">Total</h5>
              <h1 className="mb-0">$3100</h1>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-between h-100">
              <p className="mb-0 fw-bold fs-5 text-success"><FaArrowTrendUp className='me-2' />34%</p>
              <h6 className="mb-1 fw-normal">Compared to Last Month 2024</h6>
            </div>
          </div>
          <div className="d-flex flex-grow-1 flex-shrink-1 justify-content-between align-items-end bg-white border-grey p-3 rounded-3">
            <div className='d-flex flex-column me-3'>
              <h5 className="mb-2">Total</h5>
              <h1 className="mb-0">$3100</h1>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-between h-100">
              <p className="mb-0 fw-bold fs-5 text-success"><FaArrowTrendUp className='me-2' />34%</p>
              <h6 className="mb-1 fw-normal">Compared to Last Month 2024</h6>
            </div>
          </div>
          <div className="d-flex flex-grow-1 flex-shrink-1 justify-content-between align-items-end bg-white border-grey p-3 rounded-3">
            <div className='d-flex flex-column me-3'>
              <h5 className="mb-2">Total</h5>
              <h1 className="mb-0">$3100</h1>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-between h-100">
              <p className="mb-0 fw-bold fs-5 text-success"><FaArrowTrendUp className='me-2' />34%</p>
              <h6 className="mb-1 fw-normal">Compared to Last Month 2024</h6>
            </div>
          </div>
        </div>
        <h2 className="mb-0 bg-white w-100 p-3 rounded-3">Income States</h2>
        <Column {...config} className='bg-white rounded-3 w-100' />
        <div className='w-100'>
          <div
            style={{
              marginBottom: 16,
            }}
            className='d-flex justify-content-between align-items-center gap-16 flex-wrap bg-white p-3 rounded-3'
          >
            <h2 className="mb-0">Recent Orders</h2>
          </div>
          <CommonTable data={tabledata} columns={columns} />
        </div>
      </div>
    </>
  )
}

export default Dashboard;