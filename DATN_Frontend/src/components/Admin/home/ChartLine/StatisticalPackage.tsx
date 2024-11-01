import React from 'react';
import { Line } from '@ant-design/plots';
import { Order } from '../../../../interface/admin/order';

interface ChildComponentProps {
  PackageHistory: Order[] | undefined; // Sửa kiểu dữ liệu thành Order[] | undefined
}

const RevenueLineChart: React.FC<ChildComponentProps> = ({ PackageHistory }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const monthsInYear = Array.from({ length: 12 }, (_, index) => index + 1);

  const revenueData = monthsInYear.map((month) => {
    if (PackageHistory) {
      const ordersInMonth = PackageHistory.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getFullYear() === currentYear && orderDate.getMonth() + 1 === month;
      });

      const totalRevenue = ordersInMonth.reduce((total, order) => total + order.order_price, 0);

      return {
        month: month,
        revenue: totalRevenue,
      };
    }

    return null;
  }).filter(Boolean);

  const config: any = {
    data: revenueData,
    xField: 'month',
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

export default RevenueLineChart;
