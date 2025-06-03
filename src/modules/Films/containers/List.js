import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Table, Typography } from 'antd';
import { getFilmsList } from '../api/requests';
import { formatDateTime, getIdFromUrl } from '../../Common/functions';
import { UrlListTableCellView, MultipleAttributeTableCellView } from '../../Common/components';
import Styles from '../../Common/Layouts/styles';

/* eslint-disable camelcase */
const { Title, Paragraph } = Typography;

function FilmsList() {
  const styles = Styles();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onLoad = async () => {
    setIsLoading(true);
    try {
      const res = await getFilmsList() || [];
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
      key: 'title',
      dataIndex: 'title',
      title: 'title',
      ellipsis: true,
      width: 200,
      render: (_, { title, id }) => <Link to={`/films/${id}`}>{title}</Link>,
    },
    {
      key: 'director',
      dataIndex: 'director',
      title: 'director',
      ellipsis: true,
      width: 120,
      render: (_, { director }) => director,
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
      key: 'characters',
      dataIndex: 'characters',
      title: 'characters',
      ellipsis: true,
      width: 100,
      render: (_, { characters }) => (
        <UrlListTableCellView entities={characters.map(url => ({
          key: getIdFromUrl(url),
          value: url,
          url: `/people/${getIdFromUrl(url)}`,
        }))}
        />
      ),
    },
    {
      key: 'episode_id',
      dataIndex: 'episode_id',
      title: 'episode_id',
      ellipsis: true,
      width: 120,
      render: (_, { episode_id }) => episode_id,
    },
    {
      key: 'opening_crawl',
      dataIndex: 'opening_crawl',
      title: 'opening_crawl',
      ellipsis: true,
      width: 120,
      render: (_, { opening_crawl }) => (
        <MultipleAttributeTableCellView
          values={opening_crawl}
          content={<Paragraph>{opening_crawl}</Paragraph>}
        >
          {opening_crawl}
        </MultipleAttributeTableCellView>
      ),
    },
    {
      key: 'planets',
      dataIndex: 'planets',
      title: 'planets',
      ellipsis: true,
      width: 80,
      render: (_, { planets }) => (
        <UrlListTableCellView entities={planets.map(url => ({
          key: getIdFromUrl(url),
          value: url,
          url,
        }))}
        />
      ),
    },
    {
      key: 'producer',
      dataIndex: 'producer',
      title: 'producer',
      ellipsis: true,
      width: 240,
      render: (_, { producer }) => producer,
    },
    {
      key: 'release_date',
      dataIndex: 'release_date',
      title: 'release_date',
      ellipsis: true,
      width: 120,
      render: (_, { release_date }) => release_date,
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
          Films list
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

export default FilmsList;
