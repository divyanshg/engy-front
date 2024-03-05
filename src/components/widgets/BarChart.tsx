import React from 'react';

import { BarChart as Bc } from '@tremor/react';

interface BarChartProps {
  config: {
    index: string;
    categories: string[];
    colors: string[];
  };
  data:
    | {
        time: string;
        [propertyName: string]: string;
      }[];
}
function BarChart(props: BarChartProps) {
  return (
    <Bc
      data={props.data}
      index={props.config.index}
      categories={props.config.categories}
      colors={props.config.colors}
      yAxisWidth={48}
    />
  );
}

export default BarChart;
