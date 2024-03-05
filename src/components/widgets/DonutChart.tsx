import React from 'react';

import { DonutChart as Dc } from '@tremor/react';

interface DonutProps {
  config: {
    index: string;
    categories: string;
    colors: string[];
  };
  data:
    | {
        time: string;
        [propertyName: string]: string;
      }[];
}
function DonutChart(props: DonutProps) {
  return (
    <Dc
      data={props.data}
      category={props.config.categories}
      index={props.config.index}
      colors={props.config.colors}
    />
  );
}

export default DonutChart;
