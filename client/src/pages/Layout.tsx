import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import Aside from "./layout/Aside";
import MyHeader from "./layout/MyHeader";
import "./Layout.css"

const { Header, Footer, Sider, Content } = Layout;

const _Layout: React.FC = function () {

    return (
        <div className="container">
            <Layout>
                <Header>
                    <MyHeader />
                </Header>
                <Layout>
                    <Sider>
                        <Aside />
                    </Sider>
                    <Content className="content-container">
                        <Outlet />
                    </Content>
                </Layout>
                <Footer className="footer">Footer</Footer>
            </Layout>

        </div>
    )
}

export default _Layout