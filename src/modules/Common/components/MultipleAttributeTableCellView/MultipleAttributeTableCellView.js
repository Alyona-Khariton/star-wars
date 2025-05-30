import { useState, useRef, useEffect } from 'react';
import { Button, Col, Popover, Row, Space } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
// import { notificationService } from '@Common/context/notificationContext';

function MultipleAttributeTableCellView({
  values,
  content,
  children,
  displayLimit = 1,
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  const checkTruncation = () => {
    if (textRef.current && typeof values === 'string' && values.trim() !== '') {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    } else {
      setIsTruncated(false);
    }
  };

  useEffect(() => {
    checkTruncation();
    const observer = new ResizeObserver(checkTruncation);

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [values]);

  const handleExpand = e => {
    e.preventDefault();
    e.stopPropagation();
    setPopoverOpen(!popoverOpen);
  };

  const handleCopy = text => {
    navigator.clipboard.writeText(text);
    // notificationService.notify?.success({
    //   message: 'Copy Success',
    //   duration: 2,
    // });
  };

  const showPopover = Array.isArray(values)
    ? values.length > displayLimit
    : values && isTruncated;

  return (
    <Row
      align="middle"
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        whiteSpace: 'nowrap',
      }}
      onClick={e => {
        if (popoverOpen) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {popoverOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'transparent',
            zIndex: 10,
          }}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setPopoverOpen(false);
          }}
        />
      )}
      <Col
        ref={textRef}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
        }}
      >
        {children || values}
      </Col>
      {showPopover && (
      <Popover
        content={(
          <Space
            direction="vertical"
            style={{
              minWidth: '200px',
              maxWidth: '600px',
            }}
            onClick={e => e.stopPropagation()}
          >
            <Space
              direction="vertical"
              style={{
                maxHeight: '340px',
                overflowY: 'auto',
                width: '100%',
              }}
            >
              {content}
            </Space>
            <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
              {typeof values === 'string' && (
                <Button type="link" size="small" onClick={() => handleCopy(values)}>
                  Copy
                </Button>
              )}
              <Button type="link" size="small" onClick={() => setPopoverOpen(false)}>
                Close
              </Button>
            </Space>
          </Space>
        )}
        trigger="click"
        open={popoverOpen}
        onOpenChange={setPopoverOpen}
        placement="bottomRight"
      >
        <Button
          type="text"
          size="small"
          icon={popoverOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
          onClick={handleExpand}
        />
      </Popover>
      )}
    </Row>
  );
}

export default MultipleAttributeTableCellView;
