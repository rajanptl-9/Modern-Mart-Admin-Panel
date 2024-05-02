import React from 'react'
import { Table } from 'antd';

const CommonTable = (props) => {  
  const { data, columns } = props;
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default CommonTable;