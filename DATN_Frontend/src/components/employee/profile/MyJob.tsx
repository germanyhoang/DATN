import { useState } from 'react'
import { Button, message, Pagination } from 'antd';
import { AiFillHeart } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../utils/hooks/FormatCurrrency';
import { useGetMyPostsQuery, useRemoveMyPostMutation } from '../../../service/post';
import './Profile.scss'
import MyJobComp from './ProfileComps/MyJobComp';
import { useGetUsersEprQuery } from '../../../service/auth_employer';

const MyJob = ({ user, imgUrl }: any) => {
  const [btnId, setBtnId] = useState(1);
  const [isJob, setIsJob] = useState(false)
  const { data } = useGetMyPostsQuery(isJob ? { isDone: true } : { isSave: true });
  const myPosts = data?.filter((myPost: any) => isJob ? myPost.isDone : myPost.isSave)

  const { data: userEprs } = useGetUsersEprQuery<any>("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(5); // Số bài viết trên mỗi trang

  // Lọc bài viết theo số trang
  const paginatedPosts = myPosts?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getLogo = (userEprId: string) => {
    const userEpr =
      userEprs && userEprs.find((item: any) => item._id === userEprId);

    return userEpr?.image;
  };

  const [removeMyPost] = useRemoveMyPostMutation()
  const onHandleRemove = async (myPost: any) => {
    await removeMyPost(myPost)
      .then(() => {
        message.success("Đã xoá khỏi Việc làm đã lưu.")
      }).catch((err: any) => {
        message.error(err.message)
      })
  }

  return (
    <>
      <div className='myJob border bg-white p-[16px] rounded'>
        <h3 className='text-[18px]'>Việc làm bạn đã lưu</h3>
      </div>
      <div className='border bg-white p-[16px] mt-[8px]'>
        <div className=''>
          <div>
            {
              paginatedPosts?.length >= 1 ?
                paginatedPosts.map((item: any, index: any) => (
                  <div key={index} className='flex items-center justify-between border rounded my-[10px] p-[16px] hover:bg-[#f9fcff]'>
                    <div className='flex items-center w-[75%]'>
                      <div className=''>
                        <img
                          src={getLogo(item.user_id)}
                          style={{ width: '100px', height: 'auto' }}
                          className='rounded-[6px]'
                        />
                      </div>
                      <div className='ml-[16px] flex-1'>
                        <NavLink to={`/posts/${item._id}`} target='_blank'>
                          <h5 className='text-[#333] text-[18px] font-medium job-name'>
                            {item.job_name}
                          </h5>
                        </NavLink>
                        <p className='mb-0 mt-[4px] text-[13px]'>Hình thức: {item.working_form}</p>
                        <p className='mb-0 text-[13px]'>{item.work_location}</p>
                        {item && item.offer_salary
                          ? <p className="m-0"><span style={{ color: 'red' }}>Thương lượng</span></p>
                          : <p className="m-0"><span style={{ color: 'red' }}>{item.min_job_salary ? `${formatCurrency(item.min_job_salary)}` : "Lên đến"} {item.min_job_salary && item.max_job_salary ? '-' : ""} {item.max_job_salary ? `${formatCurrency(item.max_job_salary)}` : "trở lên"}</span></p>
                        }
                      </div>
                    </div>

                    <div className='flex items-center justify-center'>
                      <button onClick={() => onHandleRemove({
                        _id: item._id,
                        isSave: true
                      })}>
                        <AiFillHeart className='fill-[#669cff] hover:cursor-pointer' style={{ width: '20px', height: '20px' }} />
                      </button>
                      <Button
                        onClick={() => { navigate(`/posts/${item._id}?apply=1`) }}
                        className='px-[16px] py-[6px] bg-[#FE7D55] hover:bg-[#FD6333] text-white rounded-[8px] ml-[16px]'
                        disabled={user.post_applied.some((post: any) => post.postId === item._id)}
                      >
                        Ứng tuyển
                      </Button>
                    </div>
                  </div>
                )) :
                <MyJobComp isCheck={false} />
            }
          </div>

          {
            myPosts?.length >= 1 &&
            <div className='note pt-[8px]'>
              <p>
                Lưu ý: Bạn không xem được việc làm đã hết thời hạn đăng tuyển hoặc tạm ngưng nhận hồ sơ.
              </p>
            </div>
          }

          {/* Thêm phân trang */}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={myPosts?.length}
            onChange={(page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }}
            className='mt-[16px]'
          />
        </div>
      </div>
    </>
  )
}

export default MyJob;
