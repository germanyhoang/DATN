import Header from './layoutComponentEmployer/HeaderEmployer'
import { Outlet } from 'react-router-dom'

import "../../assets/vendor/fontawesome-free/css/all.min.css"
import "../../assets/css/index.css"
import React from 'react'
// import "../../assets/css/footer.css"
// import "../../assets/css/sb-admin-2.min.css"

const LayoutEmployer = () => {
    return (
        <div>
            <Header />
            <div className="row">
                {/* <Sidebar /> */}
                {/* Content */}
                <div className="bg-white">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LayoutEmployer