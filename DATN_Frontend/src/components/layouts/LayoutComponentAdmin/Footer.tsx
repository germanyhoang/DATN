import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className="nk-footer">
    <div className="container-fluid">
      <div className="nk-footer-wrap">
        <div className="nk-footer-copyright"> © 2022 DashLite. Template by <a href="https://softnio.com" target="_blank">Softnio</a>
        </div>
        <div className="nk-footer-links">
          <ul className="nav nav-sm">
            <li className="nav-item dropup">
              <a href="#" className="dropdown-toggle dropdown-indicator has-indicator nav-link text-base" data-bs-toggle="dropdown" data-offset="0,10"><span>English</span></a>
              <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                <ul className="language-list">
                  <li>
                    <a href="#" className="language-item">
                      <span className="language-name">English</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="language-item">
                      <span className="language-name">Español</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="language-item">
                      <span className="language-name">Français</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="language-item">
                      <span className="language-name">Türkçe</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a data-bs-toggle="modal" href="#region" className="nav-link"><em className="icon ni ni-globe" /><span className="ms-1">Select Region</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Footer