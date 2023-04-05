import Chart from '../../components/chart/chart';
import FeaturedInfo from '../../components/featuredInfo/featuredInfo';
import './adminDashboard.css';
//import { userData } from '../../dummyData';
import WidgetSm from '../../components/widgetSm/widgetSm';
import WidgetLg from '../../components/widgetLg/widgetLg';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminDashboard() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/users/find/stats');
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return user.currentUser.isAdmin ? (
    <div className="dashboard">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  ) : (
    navigate('/login')
  );
}
