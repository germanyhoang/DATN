import React, { useState } from 'react';
import { useSearchParams, NavLink } from "react-router-dom";
import { Pagination } from 'antd';
import { useGetUsersEprQuery } from '../../../service/auth_employer';
import HeaderSearchhJob from '../../layouts/HeaderSearchhJob';
import './Company.css';

const Company = () => {
    const company_field = [
        "Vận tải và giao nhận",
        "Giáo dục / Đào tạo",
        "Năng lượng xanh / tái tạo",
        "Công nghệ và Fintech",
        "Y tế và dược phẩm",
        "Dịch vụ tài chính",
        "Thực phẩm và đồ uống",
        "Bán lẻ",
        "Xây dựng và vật liệu xây dựng",
        "Nông nghiệp",
        "Khách sạn và giải trí",
        "Bất động sản",
        "Dầu, khí và tài nguyên thiên nhiên",
        "Khác",
    ];

    const [params, setURLSearchParams] = useSearchParams();
    const key = params.get('key');
    const company_field_params = params.get('company_field');
    const { data: users }: any = useGetUsersEprQuery('');
    const [inputValue, setInputValue] = useState(key ?? "");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6; // Số công ty trên mỗi trang

    const handleSetKey = () => {
        params.set('key', inputValue);
        setURLSearchParams(params);
        setCurrentPage(1); // Reset trang khi tìm kiếm mới
    };

    // Xử lý phân trang
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Lọc và phân trang dữ liệu
    const filteredUsers = users?.filter((i: any) => 
        i.company_name && 
        i.company_name.toLowerCase().includes(key?.toLowerCase() ?? "") && 
        i.company_field.includes(company_field_params ?? "")
    );

    const paginatedUsers = filteredUsers?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <div className='bg-[#fff]'>
                <HeaderSearchhJob className={'py-[16px]'} />
            </div>
            <div className='company-wrap'>
                <div className="company-body">
                    <div className="company-header">
                        <h1 className='company-header__title'>Khám Phá Văn Hóa Công Ty</h1>
                        <p className="company-header__desc">
                            Tìm hiểu văn hoá công ty và chọn cho bạn nơi làm việc phù hợp nhất.
                        </p>
                        <div className="company-header__search">
                            <div className="company-header__search-wrap">
                                <label className='company-header__search-label' htmlFor="company-search-input"><i className="company-header__search-icon fa-solid fa-magnifying-glass"></i></label>
                                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSetKey()} type="text" id='company-search-input' className="company-header__search-input" placeholder='Nhập tên công ty' />
                            </div>
                            <div className="company-header__search-btn" onClick={handleSetKey}>
                                Tìm
                            </div>
                        </div>
                    </div>
                    <div className="company-content">
                        <div className="company-content__header">
                            <h2 className='company-content__header-title'>
                                Công ty nổi bật
                            </h2>
                            <select className="px-[4px] border rounded" onChange={(e) => { params.set('company_field', e.target.value), setURLSearchParams(params) }} name="cars" id="cars" style={{ height: "40px", minWidth: '80px', borderRadius: '4px', outline: 'none', marginLeft: '10px', gap: '5px' }}>
                                <option value="">Tất cả lĩnh vực</option>
                                {
                                    company_field.map((item: any, index: number) =>
                                        <option key={index} value={item}>{item}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="company-content__list">
                            {
                                paginatedUsers && paginatedUsers.map((user: any) => (
                                    <div className="grid-col-4" key={user._id}>
                                        <div className="company-content__item">
                                            <div className="company-content__item-image">
                                                <span className='company-content__item-image-cover'>
                                                    <img src={user.company_banner} alt={user.company_name} />
                                                </span>

                                                <a href="" className="company-content__item-image-avatar">
                                                    <img src={user.image} alt={user.company_name} />
                                                </a>

                                                <span className="company-content__item-image-view">
                                                    <i className="fa-solid fa-folder-open"></i>
                                                    {user.company_field}
                                                </span>
                                            </div>

                                            <div className="company-content__item-info">
                                                <a href="" className="company-content__item-info-title">
                                                    {user.company_name}
                                                </a>
                                                <p className='company-content_desc'>{user.desc_epr}</p>
                                            </div>

                                            <NavLink to={`/company/${user._id}`} className="company-content__item-btn">
                                                Xem
                                            </NavLink>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="company-content__btn">
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={filteredUsers?.length}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                                style={{ textAlign: 'center' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Company;
