import { NavLink, useParams } from 'react-router-dom'
import { useGetUserEprQuery } from '../../../service/auth_employer'
import { useAddMyPostMutation, useGetPostsByUIdQuery, useRemoveMyPostMutation } from '../../../service/post'
import { Avatar, Card, List, message } from 'antd'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useAddNotificationMutation } from '../../../service/notification'

import './CompanyDetail.css'
import { FaUser } from 'react-icons/fa'

type Props = {}

const CompanyDetail = (props: Props) => {
    const { id } = useParams()
    const { data: userEpr }: any = useGetUserEprQuery(id && id)
    const { data: posts } = useGetPostsByUIdQuery(userEpr && userEpr._id)
    
    const [removeMyPost] = useRemoveMyPostMutation()
    const handleRemove = async (post: any) => {
        await removeMyPost(post)
        .then(() => {
            message.success("Đã xoá khỏi Việc làm đã lưu")
        }).catch((err: any) => {
            message.error(err.message)
        })
    }

    const [addMyPost] = useAddMyPostMutation()
    const [addNotification] = useAddNotificationMutation()
    const onHandleAdd: any = async (post: any) => {
        try {
            await addNotification({
                email: userEpr?.email,
                role: 2,
                notification_title: "Đã lưu vào Việc làm đã lưu",
                notification_content: post.job_content
            });
    
            await addMyPost({
                _id: post._id,
                isSave: true,
            });
    
            message.success('Đã thêm vào Việc làm đã lưu');
        } catch (err: any) {
            console.log(err.message);
            message.error('Có lỗi xảy ra');
        }
    }

  return (
    <div style={{ padding: 16 }}>
        <div className="cpn_header">
            <div 
                className="cpn_banner" 
                style={{backgroundImage: `url(${userEpr?.company_banner})`}}
            />
            <div className="cpn_info bg-gradient-to-r from-[#001744] via-[#001744] to-[#0053EB] py-[16px] pl-[200px]">
                <Avatar className='cpn_logo' src={userEpr?.image} />    
                <h2 className='text-[#fff] text-[28px]'>{userEpr?.company_name}</h2>
                <div>
                    <span>{userEpr?.address}</span> - <span>{userEpr?.company_field}</span> <span>{userEpr?.company_size}</span>
                </div>
            </div>
        </div>
        <div className="cpn_content">
            <Card 
                title="Giới thiệu công ty" 
                bordered={false} 
                style={{ flex: 1, fontSize: 16}}
                headStyle={{
                    fontSize: 20,
                    fontWeight: 700,
                    background: 'linear-gradient(90deg,#001744,#0053EB)',
                    color: '#fff',
                }}
            >
                <p>{userEpr?.desc_epr}</p>
            </Card>
            <Card 
                title="Thông tin liên hệ" 
                bordered={false} 
                style={{ width: '30%', marginLeft: 16, fontSize: 16 }}
                headStyle={{
                    fontSize: 20,
                    fontWeight: 700,
                    background: 'linear-gradient(90deg,#001744,#0053EB)',
                    color: '#fff',
                }}
            >
                <p className='flex items-center text-[20px] font-[500]'>
                    <FaUser size={30} style={{ marginRight: 16 }} /> 
                    {userEpr?.name}
                </p>
                <p><span className='font-[600] mr-[8px]'>Email:</span> {userEpr?.email}</p>
                <p><span className='font-[600] mr-[8px]'>Liên hệ:</span> {userEpr?.phone}</p>
            </Card>
        </div>
        <Card 
                title="Tuyển dụng" 
                bordered={false} 
                style={{ flex: 1, fontSize: 16, width: '80%', margin: '0 auto', marginTop: 40}}
                headStyle={{
                    fontSize: 20,
                    fontWeight: 700,
                    background: 'linear-gradient(90deg,#001744,#0053EB)',
                    color: '#fff',
                }}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={posts}
                    renderItem={(item: any, index: number) => (
                        <List.Item style={{ width: '100%' }} extra={
                            <div className='flex items-center justify-center'>
                                {
                                    item.isSave ? 
                                    <AiFillHeart
                                        onClick={() => handleRemove({ _id: item._id, isSave: true })}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                    />
                                    :
                                    <AiOutlineHeart
                                        onClick={() => onHandleAdd(item)}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                    />
                                }
                                <NavLink 
                                to={`/posts/${item._id}?apply=1`} 
                                target='_blank'
                                className='px-[16px] py-[6px] bg-[#FE7D55] hover:bg-[#FD6333] text-white rounded-[8px] ml-[16px]'
                                >
                                Ứng tuyển
                                </NavLink>
                            </div>
                        }>
                            <List.Item.Meta
                                avatar={<Avatar size={100} shape='square' src={userEpr.image} />}
                                title={<span className='text-[18px] mb-0'>{item?.job_name}</span>}
                                description={
                                    <>
                                        <p className='text-[#333]'>{userEpr?.company_name}</p>
                                        {
                                            (
                                                item?.work_location).map((location: any) =>
                                                <span className='text-[#333] bg-[#e9eaec] py-[4px] px-[8px] rounded-[6px]'>{location}</span>
                                            )
                                        }
                                    </>
                                }
                            />
                            
                        </List.Item>
                    )}
                />
            </Card>
        
    </div>
  )
}

export default CompanyDetail