import React from 'react';

import { AreaChart as Ac } from '@tremor/react';

interface AreaChartProps {
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
function AreaChart(props: AreaChartProps) {
  return (
    <Ac
      data={props.data}
      index={props.config.index}
      categories={props.config.categories}
      colors={props.config.colors}
      yAxisWidth={30}
      enableLegendSlider={true}
    />
  );
}

export default AreaChart;
