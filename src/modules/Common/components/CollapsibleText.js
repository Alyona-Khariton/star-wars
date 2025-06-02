import { useState } from 'react';
import { Typography } from 'antd';

function CollapsibleText({ text, rows = 1 }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = e => {
    e.stopPropagation();
    setExpanded(prev => !prev);
  };

  return (
    <Typography.Paragraph
      style={{ textWrap: 'balance' }}
      ellipsis={{
        rows,
        expanded,
        expandable: 'collapsible',
        onExpand: handleExpand,
      }}
    >
      {text}
    </Typography.Paragraph>
  );
}

export default CollapsibleText;
