import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  VideoCameraOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { PeopleCard, PeopleList } from '../modules/People/containers';
import { FilmCard } from '../modules/Films/containers';

const { Content, Sider } = Layout;

function getItem(label, key, icon, path, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={path}>{label}</Link>,
  };
}

const items = [
  getItem('People', 'people', <TeamOutlined />, '/people'),
  getItem('Films', 'films', <VideoCameraOutlined />, '/films'),
];

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <Menu theme="dark" defaultSelectedKeys={['people']} mode="inline" items={items} />
        </Sider>

        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Routes>
              <Route path="/people" element={<PeopleList />} />
              <Route path="/people/:peopleId" element={<PeopleCard />} />
              <Route path="/films/:filmId" element={<FilmCard />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
