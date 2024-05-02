import React, { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, getColors } from '../features/colors/colorSlice';

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
        title: 'Create Date',
        dataIndex: 'createDate',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Colors = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const deletedColor = useSelector(state => state.colors.deletedColor);

    useEffect(() => {
        setDeleteId(null);
        dispatch(getColors());
    }, [dispatch,deletedColor]);

    const handleDeleteColor = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    }
    
    const confirmDelete = () => {
        setModalOpen(false);
        dispatch(deleteColor(deleteId));
    }

    const colorState = useSelector((state) => state.colors.colors);
    const tabledata = [];
    if (colorState) {
        for (let i = 0; i < colorState.length; i++) {
            tabledata.push({
                key: i,
                name: colorState[i].title,
                createDate: colorState[i].createdAt.replace('T', '\n').replace('Z', ' ').replace(/\.(\d{3})/g, ''),
                action: <>
                    <Link to={`/admin/add-color/${colorState[i]._id}`} className="text-decoration-none text-primary"><FaRegEdit className='me-2 fs-6' /></Link>
                    <button className="text-decoration-none border-0 bg-white text-danger" onClick={() => handleDeleteColor(colorState[i]._id)}><MdOutlineDeleteForever className='me-2 fs-5' /></button>
                </>,
            });
        }
    }
    return (
        <>
            <div className='w-100'>
                <div
                    style={{
                        marginBottom: 16,
                    }}
                    className='d-flex justify-content-between align-items-center gap-16 flex-wrap bg-white p-3 rounded-3'>
                    <h2 className="mb-0">Colors</h2>
                </div>
                <Table columns={columns} dataSource={tabledata} />
                <Modal
                    title="Confirm Color Delete"
                    centered
                    open={modalOpen}
                    onOk={() => confirmDelete()}
                    onCancel={() => {setModalOpen(false); setDeleteId(null)}}
                >
                    <p>Are you sure want to delete color?</p>
                </Modal>
            </div>
        </>
    )
}

export default Colors;