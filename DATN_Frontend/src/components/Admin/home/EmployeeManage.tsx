import { useRef, useEffect, useState } from 'react'
import { useBlockUserMutation, useUnlockUserMutation, useUpdateUserMutation } from '../../../service/admin'
import { Button, Form, Input, InputNumber, InputRef, Space, Table, TableProps, message } from 'antd';
import type { ColumnType, ColumnsType, FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Popconfirm } from 'antd';
import { useGetUsersQuery } from '../../../service/auth';
import { useGetUsersEprQuery } from '../../../service/auth_employer';
import React from 'react';

const EmployeeManage = () => {

  const { data: userEpe } = useGetUsersQuery();
  const [block] = useBlockUserMutation();
  const [unlock] = useUnlockUserMutation();
  const [data, setData] = useState<any[]>([]);
  
  // const data = userEpe?.map((item: any, index: any) => ({
  //   key: String(index),
  //   ...item,
  // }));
  
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    if (userEpe) {
      const mappedData = userEpe.map((item: any, index: any) => ({
        key: String(index),
        ...item,
      }));
      setData(mappedData); 
    }
  }, [userEpe]);
  interface DataType {
    key: string;
    _id: string;
    name: string;
    phone: string;
    level_auth: number;
    email: string;
    password: string;
    role: number;
    isBlock: boolean;

  }
  type DataIndex = keyof DataType;

  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
   
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm tên`}
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
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Xóa trắng
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
            Lọc
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
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
  })

  const handleBlock = async (user: any) => {
    const result = await block(user);
    if (result) {
      const updatedData = data.map((item) => 
        item._id === user._id ? { ...item, isBlock: true } : item
      );
      setData(updatedData); 
    }
  };

  const handleUnlock = async (user: any) => {
    const result = await unlock(user);
    if (result) {

      const updatedData = data.map((item) => 
        item._id === user._id ? { ...item, isBlock: false } : item
      );
      setData(updatedData); 
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      filteredValue: filteredInfo.role || null,
      ...getColumnSearchProps('role'),
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      filteredValue: filteredInfo.name || null,
      ...getColumnSearchProps('name'),
      ellipsis: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record: any) => (

        <Space size="middle">
          {
            record.isBlock ?
              <Popconfirm
                title="Bạn chắc chắn xuốn khóa tài khoản này"
                onConfirm={() => handleUnlock(record)}
                okText="Đồng ý"
                okButtonProps={{
                  className: 'bg-red-500',
                }}
                cancelText="Không"
              >
                <button className='btn btn-danger'>
                  Mở khóa
                </button>
              </Popconfirm> :
              <Popconfirm
                title="Bạn muốn mở khóa tài khoản này?"
                onConfirm={() => handleBlock(record)}
                okText="Đồng ý "
                okButtonProps={{
                  className: 'bg-blue-500',
                }}
                cancelText="Không"
              >
                <button className='btn btn-success'>
                  Khóa
                </button>
              </Popconfirm>
          }

        </Space>
      ),
    },
  ];

  return (
    <div className="nk-content ">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-block-head-sm">
              <div className="nk-block-between">
                <div className="nk-block-head-content">
                  <h4 className="nk-block-title page-title">Quản lý ứng viên</h4>
                </div>{/* .nk-block-head-content */}
              </div>{/* .nk-block-between */}
            </div>{/* .nk-block-head */}
            <div className='nk-block'>
              <>
                <Space style={{ marginBottom: 16 }}>
                  <Button onClick={clearFilters}>Xóa bộ lọc</Button>
                  {/* <Button onClick={clearAll}>Xóa bộ lọc và sắp xếp</Button> */}
                </Space>
                <Table columns={columns} dataSource={data} onChange={handleChange} />
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeManage