import React, { useState } from 'react';
import './Sidebar.css';
import {
  HomeOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Navbar from './Navbar';

const { Header, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  <br />,
  getItem('Home', '1', <HomeOutlined />),
  getItem('Registrations', 'sub1', <UserOutlined />, [
    getItem('Plant Details', '3'),
    getItem('Plant Type', '4'),
  ]),
  getItem('View', 'sub2', <UnorderedListOutlined />, [
    getItem('Plant Details View', '6'),
    getItem('Plant Type View', '8'),
  ]),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: colorBgContainer, padding: 0 }}>
        <Navbar />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ backgroundColor:"#F14F93" }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items}>
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon} style={{ marginBottom: '8px' }}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        
      </Layout>
    </Layout>
  );
};

export default App;
