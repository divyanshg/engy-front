import { LineChart as Lc } from '@tremor/react';

interface LineChartProps {
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

function LineChart(props: LineChartProps) {
  return (
    <Lc
      data={props.data}
      index={props.config.index}
      categories={props.config.categories}
      colors={props.config.colors}
      yAxisWidth={48}
    />
  );
}

export default LineChart;
