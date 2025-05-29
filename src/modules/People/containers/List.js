import { useEffect, useState } from 'react';
import { Divider, Layout, Space, Table, Typography, theme } from 'antd';
import { getPeopleList } from '../api/requests';

const { Link, Title } = Typography; 

const PeopleList = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onLoad = async () => {
    setIsLoading(true);
    try {
      const res = await getPeopleList() || [];
      setData(res.map(item => {
        const lastIndex = item.url?.lastIndexOf("/")

        return {
          ...item,
          id: item.url?.slice(lastIndex + 1),
        };
      }
      ));
    } finally {
      setIsLoading(false);
    };      
  };

  useEffect(() => {
    onLoad();
  }, []);

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'name',
      ellipsis: true,
      width: 314,
      render: (_, { name, id }) => (
        <Link href={`/people/${id}`}>{name}</Link>
      ),
    },
    {
      key: 'eye_color',
      dataIndex: 'eye_color',
      title: 'eye_color',
      ellipsis: true,
      width: 410,
      render: (_, { eye_color }) => eye_color,
    },
    
  ];

  return (
    <Layout>
      <Layout /*style={styles.ToolBar}*/>
        <Space split={<Divider type="vertical" />}>
          <Title level={3}>
            People list
          </Title>
        </Space>
      </Layout>

      <Table
        style={{ width: '100%' }}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
        size="small"
        scroll={{ x: '100%', y: 'calc(100vh - 68px - 39px - 56px)' }}
      />
    </Layout>
  );
};

export default PeopleList;
