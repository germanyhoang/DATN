import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useGetPostsByUIdQuery, useResetNewCandidatesMutation } from '../../../service/post';
import { NavLink, useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Alert, Badge, InputRef, message, Popconfirm, Spin, Tag } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { MessageType } from 'antd/es/message/interface';
import { useRemovePostMutation } from '../../../service/post'
import { apiGetProvinces } from '../../../service/api';
import { useAppSelector } from '../../../app/hook';
import { useGetUserEprByEmailQuery } from '../../../service/auth_employer';
import { useGetCareersQuery } from '../../../service/admin';
import CandidateList from './PostComponents/CandidateList';

const PostList = (): any | null | JSX.Element => {
    const [resetNewCandidate] = useResetNewCandidatesMutation()
    const searchInput = useRef<InputRef>(null);
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [open, setOpen] = useState(false);
    const [postId, setPostId] = useState('');
    const { data: careers } = useGetCareersQuery();
    const getCareerNameById = (careerId: any) => {
        const career = careers?.find((c) => c._id === careerId)
        return careerId?.name;
    };
    const [selectedPostTitle, setSelectedPostTitle] = useState('');
    const { email, isLoggedIn } = useAppSelector((res) => res.authEmpr);
    const { data: user }: any = useGetUserEprByEmailQuery(email);
    const { data: posts, error, isLoading } = useGetPostsByUIdQuery(user?._id)
    const text: string = 'Bạn có chắc chắn muốn xóa tin này không?';

    const [provinces, setProvinces] = useState<any>([])
    useEffect(() => {
        const fetchProvinces = async () => {
            const { data: response }: any = await apiGetProvinces()
            setProvinces(response?.results);
        }
        fetchProvinces()
    }, [])

    interface DataType {
        key: string;
        _id: string;
        job_name: string;
        job_description: string;
        job_salary: number;
        offer_salary: boolean;
        working_form: string;
        number_of_recruits: number;
        requirements: string;
        gender: string;
        min_job_salary: string;
        max_job_salary: string;
        work_location: string;
        post_status: boolean | string;
        user_id: string;
        createdAt: string;
        career: string;
        newCandidates: number;
        period: string
    }
    type DataIndex = keyof DataType;
    const dataSource = posts?.map((item: DataType, index: string) => ({
        key: String(index),
        _id: String(item._id),
        job_name: String(item.job_name),
        offer_salary: Boolean(item.offer_salary),
        job_description: String(item.job_description),
        job_salary: Number(item.job_salary),
        working_form: String(item.working_form),
        min_job_salary: String(item.min_job_salary),
        max_job_salary: String(item.max_job_salary),
        number_of_recruits: Number(item.number_of_recruits),
        requirements: String(item.requirements),
        gender: String(item.job_name),
        work_location: String(item.work_location),
        post_status: Boolean(item.post_status),
        user_id: String(item.user_id),
        createdAt: String(item.createdAt),
        career: getCareerNameById(item?.career) || '',
        newCandidates: Number(item.newCandidates),
        period: String(item.period)
    }))

    dataSource?.sort((prevPost: any, nextPost: any) => {
        return nextPost.newCandidates - prevPost.newCandidates
    })

    const [removePost] = useRemovePostMutation()
    const onHandleRemove = (id: string) => {
        const confirmMsg: MessageType = message.success('Xóa thành công.')
        if (confirmMsg !== null) {
            removePost(id)
        }
    }
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
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm`}
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
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tiêu đề',
            dataIndex: 'job_name',
            ...getColumnSearchProps('job_name'),
            ellipsis: true,
        },
        {
            title: 'Ngành nghề',
            dataIndex: 'career',
            ...getColumnSearchProps('career'),
            render: (text) => <span className='text-ellipsis'>{text}</span>,
        },
        {
            title: 'Hình thức',
            dataIndex: 'working_form',
            ...getColumnSearchProps('working_form'),
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'createdAt',
            render: (_, record) => (
                <span>{new Date(record.createdAt).toLocaleDateString()}</span>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'post_status',
            render: (_: any, record: DataType) => (
                <>
                    {
                        record.post_status == '' ?
                            <Tag
                                color={'gold'}
                                key={'Đang chờ duyệt'}
                            >
                                Đang chờ duyệt
                            </Tag>
                            :
                            <Tag
                                color={record.post_status ? "green" : "red"}
                                key={record.post_status ? "Đã duyệt" : "Từ chối"}>
                                {record.post_status ? "Đã duyệt" : "Từ chối"}
                            </Tag>
                    }
                </>
            ),
        },

        {
            title: 'Ứng viên',
            dataIndex: 'newCandidates',
            render: (_, record) => {

                return <>
                    <Badge dot={record.newCandidates > 0} offset={[2, 2]}>
                        <button
                            className='text-[#005aff] underline text-center'
                            onClick={() => {
                                setOpen(true)
                                setPostId(record._id)
                                resetNewCandidate({ post_id: record._id })
                                setSelectedPostTitle(record.job_name);
                            }}
                        >
                            Xem
                        </button>
                    </Badge>

                    <CandidateList
                        isOpen={open}
                        handleCancel={() => setOpen(false)}
                        postId={postId && postId}
                        postTitle={selectedPostTitle}
                        working_form={record.working_form}
                    />
                </>
            },

        },
        {
            title: 'Hành động',
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => {

                return (
                    <Space size="middle">
                        <NavLink to={`/home/posts/${record._id}`}>
                            <EyeOutlined className='text-dark' />
                        </NavLink>
                        <NavLink to={`/home/posts/${record._id}/edit`}>
                            <EditOutlined className='text-dark' />
                        </NavLink>
                        <Popconfirm placement="top"
                            title={text}
                            onConfirm={() => onHandleRemove(record._id)}
                            okButtonProps={{ style: { backgroundColor: "#4096FF" } }}
                            okText="Đồng ý"
                            cancelText="Không">
                            <DeleteOutlined className='text-danger' />
                        </Popconfirm>

                    </Space>
                )
            },
        },
    ];

    if (isLoggedIn == false) {
        return navigate('/login-epr')
    }

    if (isLoading) {
        return <Space className='mt-16' direction="vertical" style={{ width: '100%' }}>
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </Space>
    }
    if (error) {
        return <Space className='mt-16' direction="vertical" style={{ width: '100%' }}>
            <Alert message="Error!!!" type="error" />
        </Space>
    }

    return (
        <>
            <div className='mx-5'>
                <div className='mt-4 min-h-screen'>
                    <div className='d-flex align-items-center justify-content-between mb-2'>
                        <h2 className='mt-0 text-3xl font-bold text-[#44454A]'>Quản lý Tin tuyển dụng</h2>
                        <div className='bg-[#FE7D55] hover:bg-[#FD6333] rounded px-2 py-1'>
                            <NavLink to={'/home/posts/add'} className='text-white text-decoration-none'>
                                Đăng tin
                            </NavLink>
                        </div>
                    </div>
                    <Table columns={columns} dataSource={dataSource} />
                </div>
            </div>
        </>
    )
}


export default PostList