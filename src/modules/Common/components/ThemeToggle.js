import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

function ThemeToggle() {
  const isDarkTheme = localStorage.getItem('theme') === 'dark';

  const toggleTheme = () => {
    localStorage.setItem('theme', localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
    window.location.reload();
  };

  return (
    <Button
      onClick={toggleTheme}
      icon={isDarkTheme ? <MoonOutlined /> : <SunOutlined />}
      type="primary"
    >
      {isDarkTheme ? 'Тёмная тема' : 'Светлая тема'}
    </Button>
  );
}

export default ThemeToggle;
