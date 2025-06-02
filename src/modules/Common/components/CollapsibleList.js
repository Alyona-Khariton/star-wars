import { useEffect, useState } from 'react';
import { Space, Tag, Typography } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Link } = Typography;

function CollapsibleList({ data, renderItem, rows = 2 }) {
  const [expanded, setExpanded] = useState(false);
  const [dataView, setDataView] = useState([]);

  const CollapsibleBtn = (expanded
    ? (
      <Space>
        <UpOutlined />
        <Link onClick={() => setExpanded(false)}>
          Show less
        </Link>
      </Space>
    )
    : (
      <Space>
        <DownOutlined />
        <Link onClick={() => setExpanded(true)}>
          Show more
        </Link>
        <Tag bordered={false}>{data.length - rows}</Tag>
      </Space>
    )
  );

  useEffect(() => {
    setDataView(expanded ? data : data.slice(0, rows));
  }, [expanded, data]);

  return (
    <Space direction="vertical">
      {dataView.map((item, index) => {
        return renderItem(item, index);
      })}
      {data.length > rows && CollapsibleBtn}
    </Space>
  );
}

export default CollapsibleList;
