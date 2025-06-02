import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { CustomDescriptions, CollapsibleList, CollapsibleText } from '../../Common/components';
import { getFilmById } from '../api/requests';
import { formatDateTime, getIdFromUrl } from '../../Common/functions';
import Styles from '../../Common/Layouts/styles';

const { Link, Title } = Typography;

function FilmCard() {
  const styles = Styles();
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
        <CollapsibleList
          data={data.characters}
          renderItem={(item, index) => (
            <Link key={index} href={`/people/${getIdFromUrl(item)}`}>{item}</Link>
          )}
        />
      ) : null,
    },
    {
      key: 'opening_crawl',
      label: 'opening_crawl',
      children: (
        <CollapsibleText text={data.opening_crawl} rows={3} />
      ),
    },
    {
      key: 'planets',
      label: 'planets',
      children: data.planets?.length
        ? (
          <CollapsibleList
            data={data.planets}
            renderItem={(item, index) => (
              <Link key={index} href={item}>{item}</Link>
            )}
          />
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
          <CollapsibleList
            data={data.species}
            renderItem={(item, index) => (
              <Link key={index} href={item}>{item}</Link>
            )}
          />
        ) : null,
    },
    {
      key: 'starships',
      label: 'starships',
      children: data.starships?.length
        ? (
          <CollapsibleList
            data={data.starships}
            renderItem={(item, index) => (
              <Link key={index} href={item}>{item}</Link>
            )}
          />
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
          <CollapsibleList
            data={data.vehicles}
            renderItem={(item, index) => (
              <Link key={index} href={item}>{item}</Link>
            )}
          />
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
      <Layout style={{ ...styles.Header, ...styles.ToolBar }}>
        <Title level={3}>
          {data.title}
        </Title>
      </Layout>

      <Layout style={styles.Content}>
        <CustomDescriptions columns={attributes} style={{ width: 425 }} />
      </Layout>
    </Layout>
  );
}

export default FilmCard;
