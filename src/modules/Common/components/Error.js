import { notificationService } from '../context/notificationContext';

function ErrorDisplay({ error }) {
  if (!error) {
    return null;
  }

  notificationService.notify?.error({
    message: error.message,
  });
}

export default ErrorDisplay;
