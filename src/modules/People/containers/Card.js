import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Layout, Space, Typography } from 'antd';
import { CustomDescriptions } from '../../Common/components';
import { getPeopleById } from '../api/requests';

const { Link, Text, Title } = Typography;

function PeopleCard() {
  const { peopleId } = useParams();
  const [data, setData] = useState({});

  const attributes = useMemo(() => [
    {
      key: 'birth_year',
      label: 'Birth year',
      children: data.birth_year,
    },
    {
      key: 'created',
      label: 'created',
      children: data.created,
    },
    {
      key: 'edited',
      label: 'edited',
      children: data.edited,
    },
    {
      key: 'eye_color',
      label: 'eye_color',
      children: data.eye_color,
    },
    {
      key: 'films',
      label: 'films',
      children: data.films?.length ? (
        <Space direction="vertical">
          {data.films.map((item, index) => (
            <Link key={index}>{item}</Link>
          ))}
        </Space>
      ) : null,
    },
    {
      key: 'gender',
      label: 'gender',
      children: data.gender,
    },
    {
      key: 'hair_color',
      label: 'hair_color',
      children: data.hair_color,
    },
    {
      key: 'height',
      label: 'height',
      children: data.height,
    },
    {
      key: 'homeworld',
      label: 'homeworld',
      children: <Link>{data.homeworld}</Link>,
    },
    {
      key: 'mass',
      label: 'mass',
      children: data.mass,
    },
    {
      key: 'name',
      label: 'name',
      children: data.name,
    },
    {
      key: 'skin_color',
      label: 'skin_color',
      children: data.skin_color,
    },
    {
      key: 'species',
      label: 'species',
      children: data.species?.length
        ? data.species.map((item, index) => <Link key={index}>{item}</Link>)
        : null,
    },
    {
      key: 'starships',
      label: 'starships',
      children: data.starships?.length
        ? data.starships.map((item, index) => <Text key={index}>{item}</Text>)
        : null,
    },
    {
      key: 'url',
      label: 'url',
      children: <Link>{data.url}</Link>,
    },
    {
      key: 'vehicles',
      label: 'vehicles',
      children: data.vehicles?.length
        ? data.vehicles.map((item, index) => <Text key={index}>{item}</Text>)
        : null,
    },
  ], [data]);

  const getData = async id => {
    const res = await getPeopleById(id);
    setData(res);
  };

  useEffect(() => {
    if (!peopleId) return;
    getData(peopleId);
  }, [peopleId]);

  return (
    <Layout>
      <Layout>
        <Space split={<Divider type="vertical" />}>
          <Title level={3}>
            {data.name}
          </Title>
        </Space>
      </Layout>

      <Layout style={{ width: 425 }}>
        <CustomDescriptions columns={attributes} />
      </Layout>
    </Layout>
  );
}

export default PeopleCard;
