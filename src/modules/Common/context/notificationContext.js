import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { notification, theme } from 'antd';
import { CheckSquareFilled, CloseSquareFilled } from '@ant-design/icons';

export const NotificationContext = createContext(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const notificationService = {
  notify: null,
};

export function NotificationProvider({ children }) {
  const { token } = theme.useToken();
  const [notify, contextHolder] = notification.useNotification({
    placement: 'bottom',
    duration: 3,
  });

  useEffect(() => {
    notificationService.notify = {
      ...notify,
      info: args => notify.info({ ...args }),
      error: args => notify.error({ icon: <CloseSquareFilled style={{ color: `${token.colorError}` }} />, ...args }),
      success: args => notify.success({ icon: <CheckSquareFilled style={{ color: `${token.colorSuccess}` }} />, ...args }),
      destroy: notify.destroy,
    };
  }, [notify]);

  const memoizedValue = useMemo(() => ({
    notify
  }), [notify]);

  return (
    <NotificationContext.Provider value={memoizedValue}>
      {children}
      {contextHolder}
    </NotificationContext.Provider>
  );
}
