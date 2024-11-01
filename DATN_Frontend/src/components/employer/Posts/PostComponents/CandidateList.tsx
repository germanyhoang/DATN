import { Badge, Modal } from 'antd'
import {
    useApproveCvMutation,
    useGetCvsByPostIdQuery,
    useRemoveCvMutation,
    useSetIsNewMutation
} from '../../../../service/manage_cv';
import { useAddNotificationMutation } from '../../../../service/notification';
import { CloseOutlined, CheckOutlined, } from '@ant-design/icons'
import useDateFormat from '../../../../utils/hooks/FormatDate';

import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { NavLink } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { InputRef, message, Popconfirm, Spin, Tag } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useGetUserEprByEmailQuery } from '../../../../service/auth_employer';
import { useAppSelector } from '../../../../app/hook';

type Props = {
    postId?: string,
    isOpen?: boolean,
    handleCancel?: () => void,
    postTitle?: string,
    working_form: string
}

const CandidateList = (props: Props, post: any) => {
    useEffect(() => {
        // Khi component được tạo, kiểm tra xem có trạng thái đã lưu trong localStorage không
        const storedIsConfirmed: any = {};
        for (const key in localStorage) {
            if (key.startsWith('isConfirmed_')) {
                storedIsConfirmed[key] = JSON.parse(localStorage.getItem(key)!);
            }
        }
        setIsConfirmed(storedIsConfirmed);
    }, []);
    const { email, isLoggedIn } = useAppSelector((rs) => rs.authEmpr)
    const { data: user } = useGetUserEprByEmailQuery<any>(email)
    const handleConfirmation = (email: string, id: string, jobId: string, postTitle: string, candidateName: string) => {
        const result = window.confirm('Bạn cần xác nhận hành động này khi từ chối ứng viên');
        const customSubject = `Thông báo Kết Quả Sơ Tuyển - Vị trí *${props.postTitle}*`;
        const customBody = `Kính gửi *${candidateName}* \nChúng tôi xin chân thành cảm ơn bạn đã nộp đơn ứng tuyển cho vị trí *${props.postTitle}* tại *${user.name}*. Rất tiếc phải thông báo rằng sau quá trình sơ tuyển, chúng tôi đã chọn lựa ứng viên khác phù hợp hơn cho vị trí này. \nChúng tôi đánh giá cao nỗ lực và quan tâm của bạn đối với *${user.name}*. Chúng tôi khuyến khích bạn theo dõi các cơ hội tuyển dụng tương lai và chúng tôi hy vọng có cơ hội hợp tác với bạn trong tương lai. \nChúng tôi chúc bạn thành công trong những bước tiếp theo của sự nghiệp và cảm ơn bạn đã tham gia quá trình tuyển dụng của chúng tôi.`;
        if (result) {
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(customSubject)}&body=${encodeURIComponent(customBody)}`;
            window.location.href = mailtoLink;
            deleteCv(id)
        } else {
        }
    };


    const [isConfirmed, setIsConfirmed] = useState<{ [key: string]: boolean }>({});
    const handlePasstion = (email: string, id: string, jobId: string, postTitle: string, candidateName: string) => {
        const result = window.confirm('Bạn cần xác nhận hành động này khi phê duyệt ứng viên');
        const customSubject = `Hẹn Lịch Phỏng Vấn - Vị trí *${props.postTitle}*`;
        const customBody = `Kính gửi *${candidateName}* \nChúng tôi xin chân thành cảm ơn bạn đã nộp đơn ứng tuyển cho vị trí *${props.postTitle}* tại *${user.name}*. Sau quá trình sơ tuyển, chúng tôi rất vui thông báo rằng bạn đã được chọn cho vị trí này và chúng tôi muốn mời bạn tham gia buổi phỏng vấn. \nThông tin chi tiết về buổi phỏng vấn như thời gian, địa điểm và người phỏng vấn sẽ được thông báo trong thời gian sớm nhất. Mong rằng bạn sẽ có sự chuẩn bị tốt nhất cho cuộc gặp chúng ta. \nChúng tôi mong được gặp bạn và chúc bạn may mắn trong cuộc phỏng vấn sắp tới.`;

        if (result) {
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(customSubject)}&body=${encodeURIComponent(customBody)}`;
            window.location.href = mailtoLink;
            approveCv(id);

            const key = `isConfirmed_${id}_${jobId}`;
            localStorage.setItem(key, JSON.stringify(true));

            setIsConfirmed((prev) => ({ ...prev, [`${id}_${jobId}`]: true }));
        }
    };


    const searchInput = useRef<InputRef>(null);
    const [setIsNew] = useSetIsNewMutation()
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
    const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
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

    const columns: ColumnsType<any> = [
        {
            title: 'Tên ứng viên',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Vị trí',
            dataIndex: 'job_title',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'createdAt',
            render: (_, record) => <div>{useDateFormat(record?.createdAt)}</div>,
        },
        {
            title: 'CV',
            dataIndex: 'CV',
            render: (_, record) => {
                return (
                    <Badge dot={record.isNew} offset={[2, 2]}>
                        <NavLink to={`/cv-preview?id=${props.postId}&email=${record.email}`}
                            onClick={() => setIsNew({
                                cv_id: record._id
                            })}
                            target='_blank'
                            className="text-[#005aff] hover:text-[#005aff] underline hover:underline"
                        >
                            Xem
                        </NavLink>
                    </Badge>

                )
            },
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => {
                console.log('record >>> ', record);
                console.log('props.postId >>> ', props.postId)
                return <Space size="middle" className='flex items-center'>
                    <button
                        onClick={() => {
                            if (props.postId && props.postTitle) {
                                handlePasstion(record.email, record._id, props.postId, props.postTitle, record.name);
                            } else {
                                console.error('Missing postId or postTitle');
                            }
                        }}
                        disabled={(isConfirmed[`${record._id}_${props.postId}`])}
                    >
                        {(isConfirmed[`${record._id}_${props.postId}`]) ? 'Đã duyệt!' : 'Phê duyệt'}
                    </button>
                    <button
                        onClick={() => {
                            if (props.postId && props.postTitle) {
                                handleConfirmation(record.email, record._id, props.postId, props.postTitle, record.name);
                            } else {
                                console.error('Missing postId or postTitle');
                            }
                        }}
                    >
                        {(isConfirmed[`${record._id}_${props.postId}`]) ? '' : 'Từ chối'}
                    </button>
                </Space>
            },
        },
    ];
    const { data } = useGetCvsByPostIdQuery(props.postId && props.postId)
    const cvs = data?.cvs?.map((post: any, index: number) => ({
        key: index,
        job_title: props.working_form,
        ...post
    }))

    cvs?.sort((prevPost: any, nextPost: any) => {
        return (prevPost.isNew === nextPost.isNew) ? 0 : prevPost.isNew ? -1 : 1
    })
    const [approveCv] = useApproveCvMutation() 
    const [deleteCv] = useRemoveCvMutation()
    return (
        <Modal
            title="Danh sách ứng viên"
            open={props.isOpen}
            onCancel={props.handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
        >
            <Table dataSource={cvs} columns={columns}
                pagination={{ defaultPageSize: 6 }}
            />

        </Modal>
    )
}

export default CandidateList