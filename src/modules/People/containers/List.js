import { useEffect, useState } from 'react';
import { Layout, Table, Typography } from 'antd';
import { getPeopleList } from '../api/requests';
import { formatDateTime, getIdFromUrl } from '../../Common/functions';
import { UrlListTableCellView } from '../../Common/components';
import Styles from '../../Common/Layouts/styles';

/* eslint-disable camelcase */
const { Link, Title } = Typography;

function PeopleList() {
  const styles = Styles();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onLoad = async () => {
    setIsLoading(true);
    try {
      const res = await getPeopleList() || [];
      setData(res.map(item => {
        return {
          ...item,
          id: getIdFromUrl(item.url),
        };
      }));
    } finally {
      setIsLoading(false);
    }
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
      width: 200,
      render: (_, { name, id }) => <Link href={`/people/${id}`}>{name}</Link>,
    },
    {
      key: 'eye_color',
      dataIndex: 'eye_color',
      title: 'eye_color',
      ellipsis: true,
      width: 120,
      render: (_, { eye_color }) => eye_color,
    },
    {
      key: 'created',
      dataIndex: 'created',
      title: 'created',
      ellipsis: true,
      width: 180,
      render: (_, { created }) => formatDateTime({ value: created, format: 'L LT' }),
    },
    {
      key: 'edited',
      dataIndex: 'edited',
      title: 'edited',
      ellipsis: true,
      width: 180,
      render: (_, { edited }) => formatDateTime({ value: edited, format: 'L LT' }),
    },
    {
      key: 'films',
      dataIndex: 'films',
      title: 'films',
      ellipsis: true,
      width: 100,
      render: (_, { films }) => (
        <UrlListTableCellView entities={films.map(url => ({
          key: getIdFromUrl(url),
          value: url,
          url: `/films/${getIdFromUrl(url)}`,
        }))}
        />
      ),
    },
    {
      key: 'gender',
      dataIndex: 'gender',
      title: 'gender',
      ellipsis: true,
      width: 120,
      render: (_, { gender }) => gender,
    },
    {
      key: 'hair_color',
      dataIndex: 'hair_color',
      title: 'hair_color',
      ellipsis: true,
      width: 120,
      render: (_, { hair_color }) => hair_color,
    },
    {
      key: 'height',
      dataIndex: 'height',
      title: 'height',
      ellipsis: true,
      width: 80,
      render: (_, { height }) => height,
    },
    {
      key: 'homeworld',
      dataIndex: 'homeworld',
      title: 'homeworld',
      ellipsis: true,
      width: 240,
      render: (_, { homeworld }) => <Link>{homeworld}</Link>,
    },
    {
      key: 'mass',
      dataIndex: 'mass',
      title: 'mass',
      ellipsis: true,
      width: 80,
      render: (_, { mass }) => mass,
    },
    {
      key: 'skin_color',
      dataIndex: 'skin_color',
      title: 'skin_color',
      ellipsis: true,
      width: 120,
      render: (_, { skin_color }) => skin_color,
    },
    {
      key: 'species',
      dataIndex: 'species',
      title: 'species',
      ellipsis: true,
      width: 100,
      render: (_, { species }) => (
        <UrlListTableCellView entities={species.map(url => ({
          key: getIdFromUrl(url),
          value: url,
          url,
        }))}
        />
      ),
    },
    {
      key: 'starships',
      dataIndex: 'starships',
      title: 'starships',
      ellipsis: true,
      width: 100,
      render: (_, { starships }) => (
        <UrlListTableCellView entities={starships.map(url => ({
          key: getIdFromUrl(url),
          value: url,
          url,
        }))}
        />
      ),
    },
    {
      key: 'url',
      dataIndex: 'url',
      title: 'url',
      ellipsis: true,
      width: 240,
      render: (_, { url }) => <Link href={url} target="_blank">{url}</Link>,
    },
    {
      key: 'vehicles',
      dataIndex: 'vehicles',
      title: 'vehicles',
      ellipsis: true,
      width: 100,
      render: (_, { vehicles }) => (
        <UrlListTableCellView entities={vehicles.map(url => ({
          key: getIdFromUrl(url),
          value: url,
          url,
        }))}
        />
      ),
    },
  ];

  return (
    <Layout>
      <Layout style={{ ...styles.Header, ...styles.ToolBar }}>
        <Title level={3}>
          People list
        </Title>
      </Layout>

      <Table
        style={{ width: '100%' }}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
        size="small"
        scroll={{ x: '100%', y: 'calc(100vh - 69px - 39px - 56px)' }}
      />
    </Layout>
  );
}

export default PeopleList;
