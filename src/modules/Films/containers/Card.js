import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Layout, Space, Typography } from 'antd';
import { CustomDescriptions, ExpandableText } from '../../Common/components';
import { getFilmById } from '../api/requests';
import { formatDateTime, getIdFromUrl } from '../../Common/functions';

const { Link, Title } = Typography;

function FilmCard() {
  const { filmId } = useParams();
  const [data, setData] = useState({});

  const attributes = useMemo(() => [
    {
      key: 'director',
      label: 'director',
      children: data.director,
    },
    {
      key: 'created',
      label: 'created',
      children: formatDateTime({ value: data.created, format: 'L LT' }),
    },
    {
      key: 'edited',
      label: 'edited',
      children: formatDateTime({ value: data.edited, format: 'L LT' }),
    },
    {
      key: 'episode_id',
      label: 'episode_id',
      children: data.episode_id,
    },
    {
      key: 'characters',
      label: 'characters',
      children: data.characters?.length ? (
        <Space direction="vertical">
          {data.characters.map((item, index) => (
            <Link key={index} href={`/people/${getIdFromUrl(item)}`}>{item}</Link>
          ))}
        </Space>
      ) : null,
    },
    {
      key: 'opening_crawl',
      label: 'opening_crawl',
      children: (
        <ExpandableText text={data.opening_crawl} rows={3} />
      ),
    },
    {
      key: 'planets',
      label: 'planets',
      children: data.planets?.length
        ? (
          <Space direction="vertical">
            {data.planets.map((item, index) => <Link key={index}>{item}</Link>)}
          </Space>
        ) : null,
    },
    {
      key: 'producer',
      label: 'producer',
      children: data.producer,
    },
    {
      key: 'release_date',
      label: 'release_date',
      children: data.release_date,
    },
    {
      key: 'species',
      label: 'species',
      children: data.species?.length
        ? (
          <Space direction="vertical">
            {data.species.map((item, index) => <Link key={index}>{item}</Link>)}
          </Space>
        ) : null,
    },
    {
      key: 'starships',
      label: 'starships',
      children: data.starships?.length
        ? (
          <Space direction="vertical">
            {data.starships.map((item, index) => <Link key={index}>{item}</Link>)}
          </Space>
        ) : null,
    },
    {
      key: 'url',
      label: 'url',
      children: <Link href={data.url} target="_blank">{data.url}</Link>,
    },
    {
      key: 'vehicles',
      label: 'vehicles',
      children: data.vehicles?.length
        ? (
          <Space direction="vertical">
            {data.vehicles.map((item, index) => <Link key={index}>{item}</Link>)}
          </Space>
        ) : null,
    },
  ], [data]);

  const getData = async id => {
    const res = await getFilmById(id);
    setData(res);
  };

  useEffect(() => {
    if (!filmId) return;
    getData(filmId);
  }, [filmId]);

  return (
    <Layout>
      <Layout>
        <Space split={<Divider type="vertical" />}>
          <Title level={3}>
            {data.title}
          </Title>
        </Space>
      </Layout>

      <Layout style={{ width: 425 }}>
        <CustomDescriptions columns={attributes} />
      </Layout>
    </Layout>
  );
}

export default FilmCard;
