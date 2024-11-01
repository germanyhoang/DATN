import type { TableProps } from 'antd/es/table';
import { List, Modal } from 'antd'
import { NavLink } from 'react-router-dom';
import { Alert, message, Popconfirm, Spin, Tag } from 'antd';
import { Button, Input, InputRef, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useGetCareersQuery, useRemoveCareerMutation } from '../../../service/admin';
import { MessageType } from 'antd/es/message/interface';
import type { ColumnType, ColumnsType, FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react'
import { useGetPostsQuery, useJobCountByCareerQuery } from '../../../service/post';
type Props = {}
const CareerList = () => {
    const searchInput = useRef<InputRef>(null);
    let index = 0
    const { data: posts } = useGetPostsQuery()
    const { data: careers, error, isLoading } = useGetCareersQuery();
    const remove = 'Bạn có muốn xoá ngành nghề này?';
    const [removeCareer] = useRemoveCareerMutation();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: any,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const onHandleRemove = (id: string) => {
        const confirm: MessageType = message.success('Xoá thành công');
        if (confirm !== null) {
            removeCareer(id);
        }
    };

    const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: () => { return index += 1 }
        },
        {
            title: 'Tên ngành nghề',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Thông tin chi tiết',
            dataIndex: '',
            render: (_, record) => {
                const data = posts?.filter((post: any) => post?.career?._id === record._id)
                return <span>{data?.length}</span>
            },
        },
        {
            title: 'Hành động',
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm placement="top"
                        title={remove}
                        onConfirm={() => onHandleRemove(record._id)}
                        okButtonProps={{ style: { backgroundColor: "#4096FF" } }}
                        okText="Đồng ý"
                        cancelText="Không">
                        <DeleteOutlined className='text-danger' />
                    </Popconfirm>
                    <NavLink to={`/admin/careers/edit/${record._id}`}>
                        <EditOutlined className='text-dark' />
                    </NavLink>
                </Space>
            ),
        },
    ];

    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    if (isLoading)
        return (
            <Space direction="vertical" style={{ width: '100%' }}>
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            </Space>
        );

    if (error)
        return (
            <Space direction="vertical" style={{ width: '100%' }}>
                <Alert message="Error!!!" type="error" />
            </Space>
        );

    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2 pt-20 mx-3'>
                <div>
                    <h2 className='mt-0 text-xl'>Quản lý các ngành nghề</h2>
                </div>
                <div className='bg-success rounded px-3 py-2'>
                    <NavLink to={'/admin/careers/add'} className='text-white text-decoration-none'>
                        Tạo ngành nghề mới
                    </NavLink>
                </div>
            </div>
            <Table columns={columns} dataSource={careers} onChange={onChange} className='mx-3' />
        </>
    );
}

export default CareerList;