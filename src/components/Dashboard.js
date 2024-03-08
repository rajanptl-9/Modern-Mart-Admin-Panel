import React, { useState } from 'react';
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { FaArrowTrendUp } from "react-icons/fa6";

const columns = [
  {
    title: 'S No.',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
];
const tabledata = [];
for (let i = 0; i < 46; i++) {
  tabledata.push({
    key: i,
    name: `Edward King ${i}`,
    status: "Active",
    date: `${new Date()}`,
    product: `My product ${i}`,
  });
}
const Dashboard = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
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
              <p className="mb-0 fw-bold fs-5 text-success"><FaArrowTrendUp className='me-2'/>34%</p>
              <h6 className="mb-1 fw-normal">Compared to Last Month 2024</h6>
            </div>
          </div>
          <div className="d-flex flex-grow-1 flex-shrink-1 justify-content-between align-items-end bg-white border-grey p-3 rounded-3">
            <div className='d-flex flex-column me-3'>
              <h5 className="mb-2">Total</h5>
              <h1 className="mb-0">$3100</h1>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-between h-100">
              <p className="mb-0 fw-bold fs-5 text-success"><FaArrowTrendUp className='me-2'/>34%</p>
              <h6 className="mb-1 fw-normal">Compared to Last Month 2024</h6>
            </div>
          </div>
          <div className="d-flex flex-grow-1 flex-shrink-1 justify-content-between align-items-end bg-white border-grey p-3 rounded-3">
            <div className='d-flex flex-column me-3'>
              <h5 className="mb-2">Total</h5>
              <h1 className="mb-0">$3100</h1>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-between h-100">
              <p className="mb-0 fw-bold fs-5 text-success"><FaArrowTrendUp className='me-2'/>34%</p>
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
            <span
              style={{
                marginLeft: 8,
              }}
            >
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
            <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
              Reload
            </Button>
            
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={tabledata} />
        </div>
      </div>
    </>
  )
}

export default Dashboard;