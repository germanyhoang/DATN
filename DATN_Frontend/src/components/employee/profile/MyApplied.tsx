import React, { useState, useEffect } from "react";
import { Tag, Pagination } from "antd";  // Import Pagination từ antd
import { NavLink } from "react-router-dom";
import { formatCurrency } from "../../../utils/hooks/FormatCurrrency";
import { useGetPostsQuery } from "../../../service/post";
import "./Profile.scss";
import MyJobComp from "./ProfileComps/MyJobComp";
import { useAppSelector } from "../../../app/hook";
import { useGetUserByEmailQuery } from "../../../service/auth";
import IPost from "../../../interface/post";
import { useGetUsersEprQuery } from "../../../service/auth_employer";

interface AppliedPost extends IPost {
  postStatus: number;
}

const MyApplied = () => {
  const [filteredPosts, setFilteredPosts] = useState<AppliedPost[]>([]);
  const [isJob, setIsJob] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);  // Hiển thị 5 việc làm mỗi trang

  const { email } = useAppSelector<any>((rs: any) => rs.auth);
  const { data: user } = useGetUserByEmailQuery(email);
  const { data: posts } = useGetPostsQuery();

  useEffect(() => {
    if (user && posts) {
      const getPostById = (postId: string) => {
        return posts.find((item: any) => item._id === postId);
      };
      const postArr: AppliedPost[] = user.post_applied
        .map((item: any) => {
          const post = getPostById(item.postId);
          if (!post) return null;

          return {
            ...post,
            postStatus: item.postStatus,
          };
        })
        .filter((post: any) => post);

      setFilteredPosts(postArr);
      setIsJob(postArr.length > 0);
    }
  }, [user, posts]);

  // Tính toán các công việc hiển thị trên trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="myJob border bg-white p-[16px] rounded">
        <h3 className="text-[18px]">Việc làm bạn đã ứng tuyển</h3>
      </div>
      <div className="border bg-white p-[16px] mt-[8px]">
        <div className="">
          {currentPosts.length > 0 ? (
            currentPosts.map((item: any, index: any) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded my-[10px] p-[16px] hover:bg-[#f9fcff]"
              >
                <div className="flex items-center w-[75%]">
                  <div className="">
                    <img
                      src={item.logo}
                      style={{ width: "100px", height: "auto" }}
                      className="rounded-[6px]"
                    />
                  </div>
                  <div className="ml-[16px] flex-1">
                    <NavLink to={`/posts/${item._id}`} target="_blank">
                      {item && item.job_name ? (
                        <h5 className="text-[#333] text-[18px] font-medium job-name">
                          {item.job_name}
                        </h5>
                      ) : (
                        <p className="text-red-500">Bài đăng đã hết hạn</p>
                      )}
                    </NavLink>
                    <p className="mb-0 mt-[4px] text-[13px]">
                      Hình thức: {item.working_form}
                    </p>
                    <p className="mb-0 text-[13px]">
                      {item.work_location && item.work_location.map((item: string[]) => item + " ")}
                    </p>
                    {item && item.offer_salary 
                      ? <p className="m-0"> <span style={{ color: 'red' }}>Thương lượng</span></p>
                      : <p className="m-0"> <span style={{ color: 'red' }}>{item.min_job_salary ? `${formatCurrency(item.min_job_salary)}` : "Lên đến"} {item.min_job_salary && item.max_job_salary ? '-' : ""} {item.max_job_salary ? `${formatCurrency(item.max_job_salary)}` : "trở lên"}</span></p>
                    }
                  </div>
                </div>
                {item.postStatus === 1 && (
                  <Tag color="gold">
                    <span className="text-[15px]">Chờ xử lý</span>
                  </Tag>
                )}
                {item.postStatus === 2 && (
                  <Tag color="warning">
                    <span className="text-[15px]">Đang xử lý</span>
                  </Tag>
                )}
                {item.postStatus === 3 && (
                  <Tag color="green">
                    <span className="text-[15px]">Đã chấp nhận</span>
                  </Tag>
                )}
                {item.postStatus === 4 && (
                  <Tag color="red">
                    <span className="text-[15px]">Bị từ chối</span>
                  </Tag>
                )}
              </div>
            ))
          ) : (
            <MyJobComp isCheck={true} />
          )}
        </div>
        {filteredPosts.length > postsPerPage && (
          <Pagination
            current={currentPage}
            pageSize={postsPerPage}
            total={filteredPosts.length}
            onChange={handlePageChange}
            className="mt-4"
          />
        )}
      </div>
    </>
  );
};

export default MyApplied;
