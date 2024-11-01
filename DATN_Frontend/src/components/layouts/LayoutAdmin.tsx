import { Outlet } from 'react-router-dom';
import Footer from './LayoutComponentAdmin/Footer';
import '../../assets/css/adminCss/dashlite.css'
import '../../assets/css/adminCss/theme.css'
import Header from './LayoutComponentAdmin/Header';
import SideBar from './LayoutComponentAdmin/SideBar';
import Region from './LayoutComponentAdmin/Region';
import React from 'react';

type Props = {}

const LayoutAdmin = (props: Props) => {
    
    return (
        <div className='nk-body bg-lighter npc-general has-sidebar'>
            <div className='nk-app-root'>
                <div className='nk-main'>
                    <SideBar />
                    <div className='nk-wrap'>
                        <Header />
                        <Outlet />
                        {/* <Footer /> */}
                    </div>
                </div>
            </div>
            <Region />
        </div>
    )
}

export default LayoutAdmin