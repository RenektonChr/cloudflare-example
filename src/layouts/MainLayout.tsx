import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FileOutlined,
  TeamOutlined,
  CalendarOutlined,
  DashboardOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES, ROUTE_TITLES } from '../routes/constants';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: ROUTES.DASHBOARD.slice(1),
      icon: <DashboardOutlined />,
      label: ROUTE_TITLES.DASHBOARD,
    },
    {
      key: ROUTES.APPROVAL.slice(1),
      icon: <FileOutlined />,
      label: ROUTE_TITLES.APPROVAL,
    },
    {
      key: ROUTES.ATTENDANCE.slice(1),
      icon: <CalendarOutlined />,
      label: ROUTE_TITLES.ATTENDANCE,
    },
    {
      key: ROUTES.EMPLOYEE.slice(1),
      icon: <TeamOutlined />,
      label: ROUTE_TITLES.EMPLOYEE,
    },
    {
      key: ROUTES.PROFILE.slice(1),
      icon: <UserOutlined />,
      label: ROUTE_TITLES.PROFILE,
    },
    {
      key: ROUTES.CHAT.slice(1),
      icon: <DashboardOutlined />,
      label: ROUTE_TITLES.CHAT,
    },
    {
      key: ROUTES.AI_AGENT.slice(1),
      icon: <RobotOutlined />,
      label: ROUTE_TITLES.AI_AGENT,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
        <div className='text-white text-2xl font-bold h-8'>Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[ROUTES.DASHBOARD.slice(1)]}
          items={menuItems}
          onClick={({ key }) => navigate(`/${key}`)}
        />
      </Sider>
      <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header style={{ padding: 0, background: colorBgContainer, flex: '0 0 64px', height: 64, lineHeight: '64px', zIndex: 10 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
            style: { fontSize: '18px', padding: '0 24px', cursor: 'pointer' },
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            minHeight: 0,
            flex: 1,
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 