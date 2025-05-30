import { Flex, Space, Typography, theme } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import MultipleAttributeTableCellView from './MultipleAttributeTableCellView';

const { Link, Text } = Typography;
const { useToken } = theme;

function UrlListTableCellView({ entities }) {
  const { token } = useToken();

  return (
    <MultipleAttributeTableCellView
      values={entities}
      displayLimit={0}
      content={(
        <Flex vertical gap={token.sizeXS}>
          {entities.map(entity => (
            <Link key={entity.key} href={entity.url} target="_blank">
              {entity.value}
            </Link>
          ))}
        </Flex>
      )}
    >
      {entities.length && (
        <Space size={token.sizeXXS}>
          <LinkOutlined />
          <Text strong>{`(${entities.length})`}</Text>
        </Space>
      )}
    </MultipleAttributeTableCellView>
  );
}

export default UrlListTableCellView;
