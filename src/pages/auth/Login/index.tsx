import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUserLogin } from '../../../apis/modules/user';

const AuthLogin: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    password: '',
  });
  const updateForm = (f: Partial<typeof form>) => {
    setForm({
      ...form,
      ...f,
    });
  };
  const handleLogin = async () => {
    console.log(form);
    const { data } = await postUserLogin(form);
    if (data) {
      alert('登录成功，' + data.data.name + '(' + data.data.id + ')')
      console.log(data);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <h1>用户登录</h1>
      <div>
        <p>
          <label>
            User Name:
            <input type="text" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} />
          </label>
        </p>
        <p>
          <label>
            Password:
            <input type="password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} />
          </label>
        </p>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={() => navigate('/register')}>To Register</button>
      </div>
    </>
  );
};

export default AuthLogin;
