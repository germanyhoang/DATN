// @ts-nocheck
import React from 'react';
import { Pie } from '@ant-design/plots';
import { Order } from '../../../../interface/admin/order';
import { useGetUsersQuery } from '../../../../service/auth';
import { useGetUsersEprQuery } from '../../../../service/auth_employer';
interface ChildComponentProps {
  PackageHistory: Order[];
}
interface ChartData {
  [x: string]: any;
  Date: string;
  scales: string,
}
const StatisticalPackagePie : React.FC<ChildComponentProps> = ({ PackageHistory }) =>{

  const { data: userEpe } = useGetUsersQuery();
  const { data: userEpr } = useGetUsersEprQuery('');
  
  const data = [
    {
      type: 'Company',
      value: userEpr?.length,
    },
    {
      type: 'User',
      value: userEpe?.length,

    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
  };
  return <Pie {...config} />;
};

export default StatisticalPackagePie
