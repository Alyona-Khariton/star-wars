import { Alert, ConfigProvider, theme } from 'antd';
import { NotificationProvider } from './notificationContext';

const { ErrorBoundary } = Alert;

function AppGlobalContextProvider({ children }) {
  const isDark = localStorage.getItem('theme') === 'dark';

  return (
    <ConfigProvider
      theme={{ algorithm: isDark
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm }}
    >
      <ErrorBoundary>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default AppGlobalContextProvider;
