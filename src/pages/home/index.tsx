import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold underline">Home</h1>
      <Link to="/bill-add" className="fixed bottom-2 right-2 w-12 h-12 flex items-center justify-center rounded-full bg-blue-400">
        <span className="text-4xl text-white leading-none">+</span>
      </Link>
      <button onClick={handleLogout}>退出登录</button>
    </div>
  );
};

export default Home;
