import { Alert } from 'antd';
import { NotificationProvider } from './notificationContext';

const { ErrorBoundary } = Alert;

function AppGlobalContextProvider({ children }) {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default AppGlobalContextProvider;
