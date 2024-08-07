import "./SideBar.css";
import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // UploadOutlined,
    // UserOutlined,
    // VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet } from "react-router-dom";
import { paths } from "../../constants/paths/paths";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Header, Sider, Content } = Layout;

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>                
                <div className={`logo-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                    <div className={`logo-area-content-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                        {!collapsed ?
                            <img src={process.env.PUBLIC_URL + 'img/logo_new.webp'} alt="Logo" className="opened-menu-logo" /> :
                            <img src={process.env.PUBLIC_URL + 'img/qr.svg'} alt="Logo" className="closed-menu-logo" />
                        }
                    </div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: (
                                <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                    <img src={process.env.PUBLIC_URL + 'img/terminal.svg'} alt="Terminals" />
                                </span>
                            ),
                            label: t("nav.terminals"),
                            onClick: () => {navigate(paths.TERMINALS)}
                        },
                        {
                            key: '2',
                            icon: (
                                <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                    <img src={process.env.PUBLIC_URL + 'img/transaction.svg'} alt="Transactions" />
                                </span>
                            ),
                            label: t("nav.transactions"),
                            onClick: () => {navigate(paths.TRANSACTIONS)}
                        },
                        {
                            key: '3',
                            icon: (
                                <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                    <img src={process.env.PUBLIC_URL + 'img/mcc.svg'} alt="MCCs" />
                                </span>
                            ),
                            label: t("nav.mccCodes"),
                            onClick: () => {navigate(paths.MCC_CODES)}
                        },
                        {
                            key: '4',
                            icon: (
                                <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                    <img src={process.env.PUBLIC_URL + 'img/cities_menu.svg'} alt="Cities" />
                                </span>
                            ),
                            label: t("nav.cities"),
                            onClick: () => {navigate(paths.CITIES)}
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default SideBar;