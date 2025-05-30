import { Alert } from 'antd';

const { ErrorBoundary } = Alert;

function AppGlobalContextProvider({ children }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}

export default AppGlobalContextProvider;
