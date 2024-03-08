import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { DashboardOutlined, MailOutlined, DatabaseOutlined, ShoppingCartOutlined, ContainerOutlined, LineChartOutlined, SettingOutlined, DollarOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const jsonData = require('./SubnavContent.json');
const admin = require('../images/admin.png');
const india = require('../images/india.png');

const DashboardLayout = () => {
  useEffect(() => {
    if(!sessionStorage.getItem('token')) navigate('/');    
  });
  

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const subnavlable = ['Dashboard', 'Catalog', 'Customer', 'Orders', 'Enquiries', 'Coupon', 'File Manager', 'Analytic', 'Setting'];
  const subnav = [DashboardOutlined, DatabaseOutlined, UserOutlined, ShoppingCartOutlined, MailOutlined, DollarOutlined, ContainerOutlined, LineChartOutlined, SettingOutlined].map((icon, index) => {
    return {
      key: `${subnavlable[index]}`,
      icon: React.createElement(icon),
      label: `${subnavlable[index]}`,
      children: jsonData[subnavlable[index]] ? jsonData[subnavlable[index]].map((_, j) => {
        return {
          key: `${jsonData[subnavlable[index]][j]}`,
          label: `${jsonData[subnavlable[index]][j]}`,
        };
      }) : null,
    };
  });

  const handleMenuClick = (key) => {
    if (key === "Dashboard") {
      navigate("/admin");
    } else if (key === "Block Customer") {
      navigate("block-customer");
    } else if (key === "Unblock Customer") {
      navigate("unblock-customer");
    } else if (key === "Add Anything") {
      navigate("add-anything");
    } else if (key === "Product List") {
      navigate("product-list");
    } else if (key === "Category List") {
      navigate("category-list");
    } else if (key === "Color List") {
      navigate("color-list");
    } else if (key === "Brand List") {
      navigate("brand-list");
    } else if (key === "Orders") {
      navigate("order-list");
    } else if (key === "Enquiries") {
      navigate("enquiry-list");
    } else if (key === "Add Coupon") {
      navigate("add-coupon");
    } else if (key === "Coupon List") {
      navigate("coupon-list");
    } else if (key === "Log Out") {
      sessionStorage.removeItem('token');
      window.location.reload();
    } else if (key === "Change Password") {
      sessionStorage.removeItem('token');
      navigate("/forgot-password");
    } else {
      navigate('/admin');
    }
  }
  return (
    <div className='dashboard-layout-wrapper'>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" >Modern Mart</div>
          <Menu
            theme='dark'
            mode="inline"
            onClick={obj => handleMenuClick(obj.key)}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={subnav}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div className='heading-container d-flex justify-content-between align-items-center pe-3'>
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
              <div className="menu-bar d-flex justify-content-end align-items-center">
                  <img src={india} alt="flag" height={32} width={48} className='rounded-2 me-3'/>
                <div className='admin-details d-flex align-items-center gap-8'>
                  <img src={admin} alt="admin" height={36} width={36} />
                  <span className='admin-email d-flex justify-content-center flex-column align-items-start'>
                    <span className='mb-0 p-0'>Admin Name</span>
                    <span className='mb-0 p-0'> Admin email address</span>
                  </span>
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: '16px',
              padding: 16,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              backgroundColor: "transparent"
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;