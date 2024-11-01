import React from 'react';
import { Order } from '../../../../interface/admin/order';
import { Line } from '@ant-design/plots';

interface ChildComponentProps {
  PackageHistory: Order[] | undefined;
}

const RevenueLineChartDay: React.FC<ChildComponentProps> = ({ PackageHistory }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Lấy tháng hiện tại
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // Lấy số ngày trong tháng hiện tại

  const daysInMonthArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const revenueData = daysInMonthArray.map((day) => {
    if (PackageHistory) {
      const ordersInDay = PackageHistory.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getFullYear() === currentYear &&
          orderDate.getMonth() + 1 === currentMonth &&
          orderDate.getDate() === day
        );
      });

      const totalRevenue = ordersInDay.reduce((total, order) => total + order.order_price, 0);

      return {
        day: day,
        revenue: totalRevenue,
      };
    }

    return null;
  }).filter(Boolean);

  const config: any = {
    data: revenueData,
    xField: 'day',
    yField: 'revenue',
    xAxis: {
      type: 'cat',
    },
    yAxis: {
      type: 'linear',
      min: 0,
      nice: true,
    },
    smooth: true,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
  };

  return <Line {...config} />;
};

export default RevenueLineChartDay;
