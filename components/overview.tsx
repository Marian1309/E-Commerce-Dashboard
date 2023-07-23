'use client';

import type { FC } from 'react';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface OverviewProps {
  data: any[];
}

const Overview: FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          dataKey='total'
          stroke='#888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />

        <Bar dataKey='total' fill='#2498DB' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
