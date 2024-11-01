import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { useGetChartLineQuery } from '../../../../service/admin/chartLine';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface ChildComponentProps {
  chartData: ChartData;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
  isSuccess: boolean;
}
interface ChartData {
    [x: string]: any;
    timePeriod: string;
    value: {};
  }
const ChartUsers: React.FC<ChildComponentProps> = ({ chartData, error, isLoading, isSuccess }) => {

  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    setData([
      {
        timePeriod: "last Week",
        value: chartData?.totalUser?.userLastWeekTotal
      }
    ]);
  }, [chartData]);

  const config = {
    data,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
  };

  return <Area {...config} />;
};

export default ChartUsers;
