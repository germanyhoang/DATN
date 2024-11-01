import React from 'react';
import { useApproveFeedbackMutation, useGetFeedbacksQuery, useRefuseFeedbackMutation, useRemoveFeedbackMutation } from '../../../services/feedback';
import { Alert, Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useGetEprProfileQuery } from '../../../service/employer/profileEpr';
import { useAddNotificationMutation } from '../../../service/notification';

type Props = {}

const FeedbackList = (props: Props) => {
  const { data: feedbacks = [], isLoading, error } = useGetFeedbacksQuery();
  const [approve] = useApproveFeedbackMutation();
  const [refuse] = useRefuseFeedbackMutation();
  const [removeFeedback] = useRemoveFeedbackMutation();
  const [addNotification] = useAddNotificationMutation(); // Hook để gửi thông báo

  let index = 0;
  const text_X = 'Bạn xác nhận từ chối xử lý nhận xét này?';
  const text_V = 'Bạn xác nhận xử lý nhận xét này?';
  const text_Z = 'Bạn xác nhận xóa nhận xét này?';

  const sendNotification = async (feedback: any, title: string) => {
    try {
      await addNotification({
        email: feedback.feedback_email,
        role: 2, // Hoặc giá trị phù hợp với vai trò của ứng viên
        notification_title: title,
        notification_content: feedback.feedback_question
      });
    } catch (err: any) {
      message.error(err.message || 'Gửi thông báo thất bại');
    }
  };

  const onHandleApprove = async (id: string, feedback: any) => {
    try {
      await approve({ _id: id });
      await sendNotification(feedback, "Đã xử lý phản hồi của bạn");
      message.success('Phản hồi đã được xử lý thành công');
    } catch (err: any) {
      message.error(err.message || 'Xử lý phản hồi thất bại');
    }
  };

  const onHandleRefuse = async (id: string, feedback: any) => {
    try {
      await refuse({ _id: id });
      await sendNotification(feedback, "Đã từ chối phản hồi của bạn");
      message.success('Phản hồi đã bị từ chối');
    } catch (err: any) {
      message.error(err.message || 'Từ chối phản hồi thất bại');
    }
  };

  const onHandleRemove = async (id: string, feedback: any) => {
    try {
      await removeFeedback(id);
      await sendNotification(feedback, "Đã xóa phản hồi của bạn");
      message.success('Phản hồi đã bị xóa thành công');
    } catch (err: any) {
      message.error(err.message || 'Xóa phản hồi thất bại');
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'key',
      render: () => { return index += 1 }
    },
    {
      title: 'Email',
      dataIndex: 'feedback_email',
    },
    {
      title: 'Nhận xét',
      dataIndex: 'feedback_question',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'feedback_status',
      render: (_, record) => (
        <>
          {
            record.feedback_status == null ? <Tag
              color={'gold'}
              key={'Đang chờ xử lý'}>
              Đang chờ xử lý
            </Tag>
              :
              <Tag
                color={record.feedback_status ? "green" : "red"}
                key={record.feedback_status ? "Đã xử lý" : "Từ chối"}>
                {record.feedback_status ? "Đã xử lý" : "Từ chối"}
              </Tag>
          }
        </>
      )
    },
    {
      title: 'Hành động',
      dataIndex: '_id',
      key: '_id',
      render: (_, record) => (
        <Space size="middle">

          <Popconfirm
            placement="top"
            title={text_V}
            onConfirm={() => onHandleApprove(record._id, record)}
            okText="Đồng ý"
            cancelText="Không"
            okButtonProps={{ style: { backgroundColor: "#4096FF" } }}
          >
            <CheckOutlined className='text-success' />
          </Popconfirm>

          <Popconfirm
            placement="top"
            title={text_X}
            onConfirm={() => onHandleRefuse(record._id, record)}
            okText="Đồng ý"
            okButtonProps={{ style: { backgroundColor: "#4096FF" } }}
            cancelText="Không"
          >
            <CloseOutlined className='text-danger' />
          </Popconfirm>

          <Popconfirm
            placement="top"
            title={text_Z}
            onConfirm={() => onHandleRemove(record._id, record)}
            okButtonProps={{ style: { backgroundColor: "#4096FF" } }}
            okText="Đồng ý"
            cancelText="Không"
          >
            <DeleteOutlined className='text-danger' />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <div>...isLoading</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-2 pt-20 mx-3'>
        <div>
          <h2 className='mt-0 text-xl'>Quản lý feedback</h2>
        </div>
      </div>
      <Table columns={columns} dataSource={feedbacks} className='mx-3' />
    </>
  );
};

export default FeedbackList;
