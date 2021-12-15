import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUserRegister } from '../../../apis/modules/user';

const AuthRegister: React.FC = () => {
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
  const handleRegister = async () => {
    console.log(form);
    const { data } = await postUserRegister(form);
    if (data) {
      setTimeout(() => {
        alert('注册成功，ID 为 ' + data.data.id);
      });
      console.log(data);
    }
  };
  const navigate = useNavigate();
  return (
    <div>
      <h1>User Register</h1>
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
        <p>
          <button onClick={handleRegister}>Register</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </p>
      </div>
    </div>
  );
};

export default AuthRegister;
