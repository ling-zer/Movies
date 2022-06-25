import React from "react"
import { NavLink } from "react-router-dom"
import "./MyHeader.css"

const MyHeader: React.FC = function () {
    return(
       <div className="header-container">
            <div>
                <NavLink to='/' className='nav'>
                    电影管理系统
                </NavLink>
            </div>
            <div className="login">
                <span>登录</span>

            </div>
       </div> 
    )
}

export default MyHeader