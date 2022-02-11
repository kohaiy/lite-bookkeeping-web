import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBills } from '../../apis/modules/bill';
import { GetBillsRespDatum } from '../../apis/modules/bill/get-bills';

const Home: React.FC = () => {
  const [bills, setBills] = useState<GetBillsRespDatum[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBills().then(({ data }) => {
      if (data && data.data) {
        setBills(data.data);
      }
    })
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };
  return (
    <div className="h-full overflow-auto">
      <h1 className="text-3xl font-bold underline">Home</h1>
      <Link to="/bill-add" className="fixed bottom-2 right-2 w-12 h-12 flex items-center justify-center rounded-full bg-blue-400">
        <span className="text-4xl text-white leading-none">+</span>
      </Link>
      <button onClick={handleLogout}>退出登录</button>
      <ul className=" mx-auto max-w-xl px-2 pb-20">{
        bills.map((bill) => <li className="flex mb-2 px-4 py-2 rounded bg-white shadow" key={bill.id}>
          <div>
            <div className=" text-lg font-bold">{bill.billTagName}</div>
            <div className=" text-sm text-gray-600">{bill.remarks}</div>
            <div className="mt-2 text-xs text-gray-400">{new Date(bill.actionTime).toLocaleDateString()}</div>
          </div>
          <div className="flex-1 flex flex-col items-end justify-center">
            <div>￥{(bill.amount / 100).toLocaleString('zh-CN')}</div>
            <div className="text-xs text-gray-600">{bill.billAccountName}</div>
          </div>
        </li>)
      }</ul>
    </div>
  );
};

export default Home;
