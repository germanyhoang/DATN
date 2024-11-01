import { useEffect, useState } from "react";

import axios from "axios";
import { apiGetProvinces } from "../../../service/api";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
const SearchResumes = (props: any) => {
  const [career, setCareer] = useState([]);
  const [provinces, setProvinces] = useState<any>([]);
  const [data, setData] = useState([]);

  const loadCareers = async () => {
    return await axios
      .get("http://localhost:4000/api/careers")
      .then((responsive) => setCareer(responsive.data))
      .catch((error) => console.log(error));
  };
  const fetchProvinces = async () => {
    const { data: response }: any = await apiGetProvinces();
    setProvinces(response?.results);
  };
  const level = [
    "Thực tập sinh/Sinh viên",
    "Mới tốt nghiệp",
    "Nhân viên",
    "Trưởng phòng",
    "Giám đốc và cấp cao hơn",
  ];

  const [filterParams, setFilterParams] = useState({
    work_location: "",
    main_career: "",
    level: "",
  });
  useEffect(() => {
    loadCareers();
    fetchProvinces();
    loadData();
  }, []);

  const loadData = async (params: any = null) => {
    try {
      const { data } = await axios({
        url: `http://localhost:4000/api/get-propose-candidates`,
        params,
      });
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData(filterParams); 
}, [filterParams.work_location,filterParams.main_career,filterParams.level]
)
  return (
    <div>
         <h2 className='px-3 text-2xl py-2'>Tìm kiếm ứng viên</h2>
      <div className="bg-[#f8f9fa] pt-[12px]">
        <div
          className="p-[10px]"
          style={{
            marginTop: "10px",
            backgroundColor: "rgb(229, 238, 255)",
            margin: "auto",
            width: "80%",
            borderRadius: "7px",
            display: "flex",
          }}
        >
          <select
            className="px-[4px] border rounded"
            name="cars"
            onChange={(e) =>
              setFilterParams({ ...filterParams, main_career: e.target.value })
            }
            id="cars"
            style={{
              height: "40px",
              minWidth: "80px",
              borderRadius: "4px",
              outline: "none",
              gap: "5px",
            }}
          >
            <option value="">Tất Cả Nghề Nghiệp</option>
            {career &&
              career.map((item: any, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
          <select
            className="px-[4px] border rounded"
            onChange={(e) =>
              setFilterParams({
                ...filterParams,
                work_location: e.target.value,
              })
            }
            name="cars"
            id="cars"
            style={{
              height: "40px",
              minWidth: "80px",
              borderRadius: "4px",
              outline: "none",
              marginLeft: "10px",
              gap: "5px",
            }}
          >
            <option value="">Khu vực</option>
            {provinces
              ? provinces?.map((province: any, index: number) => (
                  <option key={index} value={province.province_name}>
                    {province.province_name}
                  </option>
                ))
              : ""}
          </select>
          <select
            className="px-[4px] border rounded"
            onChange={(e) =>
              setFilterParams({ ...filterParams, level: e.target.value })
            }
            name="cars"
            id="cars"
            style={{
              height: "40px",
              minWidth: "80px",
              borderRadius: "4px",
              outline: "none",
              marginLeft: "10px",
              gap: "5px",
            }}
          >
            <option value="">Tất cả cấp bậc</option>
            {level.map((item: any, index: number) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 px-3 mt-4">
      {data && data?.map((item: any, index: any) => (
          
             <section
              key={index}
              className=" mx-auto bg-[#f0f7ff] hover:bg-[#fff] w-100 p-[16px] mt-[12px] border-[1px] border-[#a0c1ff] rounded-[6px]"
            >
              <div className="flex items-center m-0 w-[84%]">
                <div className="w-100">
                  <NavLink
                    to={`/posts/${item._id}`}
                    className="work-text__name m-0 font-medium text-[#333] text-[16px] hover:text-[#ff7d55]"
                  ></NavLink>
                  <p className="m-0">Tên ứng viên : {item?.name}</p>
                  <p className="m-0"> Chuyên ngành: {item?.main_career?.name}</p>
                  <p className="m-0"> Nơi làm việc: {item?.work_location}</p>
                  <p className="m-0"> Cấp bậc: {item?.level}</p>
                </div>
              </div>
                <div className="mt-2">
                <Button style={{backgroundColor: 'blue',color : '#fff'}} className="cursor-pointer" >
                    <NavLink to={`/home/resumes/${item._id}`}>Xem chi tiết</NavLink>
                </Button>
                </div>
            </section>
          ))}
     </div>
    </div>
  );
};

export default SearchResumes;
