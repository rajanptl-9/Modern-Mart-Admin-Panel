import React, { useState } from 'react';
import { Button, Table } from 'antd';
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

const Products = () => {
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
    return (
        <>
            <div className='w-100'>
                <div
                    style={{
                        marginBottom: 16,
                    }}
                    className='d-flex justify-content-between align-items-center gap-16 flex-wrap bg-white p-3 rounded-3'
                >
                    <h2 className="mb-0">Products</h2>
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
        </>
    )
}

export default Products;