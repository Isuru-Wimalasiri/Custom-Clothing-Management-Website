import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import './widgetLg.css';
import { format } from 'timeago.js';

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get('orders');
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        for (let i = 0; i < orders.length; i++) {
          const order = orders[i];
          const res = await userRequest.get(`users/${order.user}`);
          setTransactions((prev) => [...prev, res.data]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTransactions();
  }, [orders]);

  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order, index) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">
                {transactions[index] &&
                  transactions[index].firstName +
                    ' ' +
                    transactions[index].lastName}
              </span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">${order.amount}</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
