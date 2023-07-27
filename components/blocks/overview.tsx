'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface OverviewProps {
  data: unknown[];
}

const Overview: FC<OverviewProps> = ({ data }) => {
  const handleWindowResize = () => {
    return Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
  };

  const [height, setHeight] = useState<number>(handleWindowResize());

  window.addEventListener('resize', () => setHeight(handleWindowResize));

  return (
    <ResponsiveContainer width='100%' height={height > 900 ? 350 : 250}>
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
