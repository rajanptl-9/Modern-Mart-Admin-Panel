import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from '@ant-design/plots';
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { getMonthlyOrderIncome, getOrders, getYearlyOrder } from '../features/orders/orderSlice';
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
  const [config, setConfig] = useState({});

  const monthlyIncome = useSelector((state) => state.orders.monthlyOrderIncome);
  const yearlyData = useSelector(state => state.orders.yearlyOrders);
  const [salesCompare, setSalesCompare] = useState(0);

  useEffect(() => {
    if (monthlyIncome) {

      const data = [];
      let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      for (let i = 0; i < monthlyIncome?.length; i++) {
        data.push({
          type: monthNames[parseInt(monthlyIncome[i]?._id?.month)],
          income: monthlyIncome[i]?.total,
        });
      }
      setConfig({
        data,
        xField: 'type',
        yField: 'income',
        color: ({ type }) => {
          return "#dfd212";
        },
        label: {
          position: 'top',
          style: {
            fill: 'black',
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
          income: {
            alias: 'Income',
          },
        },
      });
      if (monthlyIncome.length > 1) {
        let diff = monthlyIncome[monthlyIncome.length - 1]?.count - monthlyIncome[monthlyIncome.length - 2]?.count;
        let percent = monthlyIncome[monthlyIncome.length - 2]?.count;
        setSalesCompare(parseFloat((diff / percent) * 100).toFixed(2));
      }
    }
    //eslint-disable-next-line
  }, [monthlyIncome]);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getMonthlyOrderIncome());
    dispatch(getYearlyOrder());
  }, [dispatch]);

  const orderState = useSelector((state) => state.orders);
  const orders = orderState.orders;

  const tabledata = [];
  if (orders) {
    for (let i = 0; i < orders?.length; i++) {
      tabledata.push({
        key: i + 1,
        orderList: <ul className='list-unstyled'>
          {orders[i]?.orderItems.map((product) => <li key={product._id} className='mb-1'>{product.product.title}&nbsp; (₹<b>{product.price * 0.72}</b> x <b>{product.quantity})</b></li>)}
        </ul>,
        date: orders[i].createdAt.replace('T', ' ').replace('Z', ' ').replace(/\.(\d{3})/g, ''),
        orderedBy: `${orders[i]?.shippingInfo.firstname} ${orders[i].shippingInfo.lastname}`,
        amount: <>₹<b>{orders[i]?.totalPriceAfterDiscount}</b></>,
        status: orders[i]?.orderStatus,
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
          {yearlyData && <>
            <div className="d-flex flex-grow-1 flex-shrink-1 justify-content-between align-items-end bg-white border-grey p-3 rounded-3">
              <div className='d-flex flex-column me-3'>
                <h5 className="mb-2">Total</h5>
                <span className='d-flex align-items-end'><span className='fs-5'>₹ </span><h1 className="mb-0">{yearlyData[0]?.totalIncome}</h1></span>
              </div>
              <div className="d-flex flex-column align-items-end justify-content-between h-100">
                {/* <p className="mb-0 fw-bold fs-5 text-success"><FaArrowTrendUp className='me-2' />34%</p> */}
                <h6 className="mb-1 fw-normal">Last Year Income From Now</h6>
              </div>
            </div>
            <div className="d-flex flex-grow-1 flex-shrink-1 justify-content-between align-items-end bg-white border-grey p-3 rounded-3">
              <div className='d-flex flex-column me-3'>
                <h5 className="mb-2">Total</h5>
                <h1 className="mb-0">{yearlyData[0]?.totalCount}</h1>
              </div>
              <div className="d-flex flex-column align-items-end justify-content-between h-100">
                {/* <p className="mb-0 fw-bold fs-5 text-success"><FaArrowTrendUp className='me-2' />34%</p> */}
                <h6 className="mb-1 fw-normal">Last Years Sales From Now</h6>
              </div>
            </div>
          </>}
          {monthlyIncome && <div className="d-flex flex-grow-1 flex-shrink-1 justify-content-between align-items-end bg-white border-grey p-3 rounded-3">
            <div className='d-flex flex-column me-3'>
              <h5 className="mb-2">Total</h5>
              <h1 className="mb-0">{monthlyIncome[monthlyIncome?.length - 1]?.count}</h1>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-between h-100">
              {salesCompare >= 0 ? <p className="mb-0 fw-bold fs-5 text-success"><FaArrowTrendUp className='me-2' />{salesCompare}%</p> : <p className="mb-0 fw-bold fs-5 text-danger"><FaArrowTrendDown className='me-2' />{salesCompare * -1}%</p>}
              <h6 className="mb-1 fw-normal">Compared to Last Month 2024</h6>
            </div>
          </div>}
        </div>
        {monthlyIncome && <>
          <h2 className="mb-0 bg-white w-100 p-3 rounded-3">Income States</h2>
          <Column {...config} className='bg-white rounded-3 w-100' />
        </>}
        {orders && <div className='w-100'>
          <div style={{ marginBottom: 16, }} className='d-flex justify-content-between align-items-center gap-16 flex-wrap bg-white p-3 rounded-3'>
            <h2 className="mb-0">Recent Orders</h2>
          </div>
          <CommonTable data={tabledata} columns={columns} />
        </div>}
      </div>
    </>
  )
}

export default Dashboard;