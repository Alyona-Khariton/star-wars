import { useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import { CustomDescriptions, CollapsibleList } from '../../Common/components';
import { getPeopleById } from '../api/requests';
import { formatDateTime, getIdFromUrl } from '../../Common/functions';
import useRequest from '../../Common/hooks/useRequest';
import Styles from '../../Common/Layouts/styles';

const { Title } = Typography;

function PeopleCard() {
  const styles = Styles();
  const { peopleId } = useParams();
  const { isLoading, data, request } = useRequest({ request: getPeopleById, autoRun: false });

  const attributes = useMemo(() => {
    if (!data) return [];

    return [
      {
        key: 'birth_year',
        label: 'Birth year',
        children: data.birth_year,
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
        key: 'eye_color',
        label: 'eye_color',
        children: data.eye_color,
      },
      {
        key: 'films',
        label: 'films',
        children: data.films?.length ? (
          <CollapsibleList
            rows={3}
            data={data.films}
            renderItem={(item, index) => (
              <Link key={index} to={`/films/${getIdFromUrl(item)}`}>{item}</Link>
            )}
          />
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
    ];
  }, [data]);

  useEffect(() => {
    if (!peopleId) return;

    request(peopleId);
  }, [peopleId]);

  return (
    <Layout>
      <Layout style={{ ...styles.Header, ...styles.ToolBar }}>
        <Title level={3}>
          {data && data.name}
        </Title>
      </Layout>

      <Layout style={styles.Content}>
        <CustomDescriptions loading={isLoading} columns={attributes} style={{ width: 425 }} />
      </Layout>
    </Layout>
  );
}

export default PeopleCard;
