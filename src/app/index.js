import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  VideoCameraOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import ErrorDisplay from '../modules/Common/components/Error';
import { ThemeToggle } from '../modules/Common/components';
import { useErrorStore } from '../modules/Common/Stores';
import { PeopleCard, PeopleList } from '../modules/People/containers';
import { FilmCard, FilmsList } from '../modules/Films/containers';
import Styles from '../modules/Common/Layouts/styles';

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
  const { hasError, dataError } = useErrorStore();
  const [collapsed, setCollapsed] = useState(false);
  const styles = Styles();

  return (
    <Router>
      {hasError && <ErrorDisplay error={dataError} />}
      <Layout hasSider style={{ height: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
          style={styles.Sider}
        >
          <ThemeToggle />
          <Menu theme="dark" defaultSelectedKeys={['people']} mode="inline" items={items} />
        </Sider>

        <Content style={styles.Main}>
          <Routes>
            <Route path="/people" element={<PeopleList />} />
            <Route path="/people/:peopleId" element={<PeopleCard />} />
            <Route path="/films" element={<FilmsList />} />
            <Route path="/films/:filmId" element={<FilmCard />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
