import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetProvinces } from '../../service/api';
import './Layout.css';

const HeaderSearchJob = ({ className }: { className: string }) => {
    const [provinces, setProvinces] = useState<any>([]);
    const navigate = useNavigate();
    const [searchItem, setSearchItem] = useState<string>('');

    const handelSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(event.target.value);
    };

    const handelSubmitData = () => {
        navigate(`/works?q=${encodeURIComponent(searchItem)}`);
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            const { data: response }: any = await apiGetProvinces();
            setProvinces(response?.results);
        };
        fetchProvinces();
        
        const queryParams = new URLSearchParams(window.location.search);
        const queryValue = queryParams.get('q');
        setSearchItem(queryValue || '');
    }, []);

    return (
        <div className={'h-[80px] w-100'}>
            <div className={'search-job flex items-center justify-center h-100 ' + className}>
                <div className='flex items-center h-100 bg-[#F4F4F7] w-75 mr-2 rounded-[6px] overflow-hidden flex-1'>
                    <div className='h-100 flex items-center bg-[#F4F4F7] w-[100%]'>
                        <button className='w-[10%] flex justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search text-black" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            className='bg-[#F4F4F7] h-100 w-[90%] text-gray-600 focus:outline-none'
                            placeholder='Tìm kiếm việc làm'
                            onChange={handelSearchInput}
                            value={searchItem}
                            onKeyDown={(e) => e.key === 'Enter' && handelSubmitData()}
                        />
                    </div>
                </div>
                <div className='h-100'>
                    <div className='h-100'>
                        <button
                            className='bg-[#FE7D55] hover:bg-[#FD6333] text-white rounded-[10px] h-100 px-10 ml-[6px]'
                            onClick={handelSubmitData}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSearchJob;
