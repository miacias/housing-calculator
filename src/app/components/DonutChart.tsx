import { DonutChart as MantineDonut, type DonutChartCell } from "@mantine/charts";
import { type ReactElement } from "react";

type DonutChartProps = {
  data: DonutChartCell[];
  chartLabel?: string | number;
  size?: number;
  thickness?: number;
  withLabels?: boolean;
  withLabelsLine?: boolean;
  withTooltip?: boolean;
  labelsType?: "value" | "percent";
  paddingAngle?: number;
  startAngle?: number;
  endAngle?: number;
  strokeColor?: string;
  strokeWidth?: number;
  tooltipAnimationDuration?: number;
  tooltipDataSource?: "all" | "segment";
  valueFormatter?: (value: number) => string;
  w?: string | number;
  h?: string | number;
};

export const DonutChart = ({
  data,
  chartLabel = '',
  size = 200,
  thickness = 20,
  withLabels = true,
  withLabelsLine = true,
  withTooltip = true,
  labelsType = "value",
  paddingAngle = 1,
  startAngle = 0,
  endAngle = 360,
  strokeColor,
  strokeWidth = 1,
  tooltipAnimationDuration = 200,
  tooltipDataSource = "all",
  valueFormatter,
  w = 300,
  h = 300,
}: DonutChartProps): ReactElement => {
  return (
    <MantineDonut
      data={data}
      w={w}
      h={h}
      chartLabel={chartLabel}
      size={size}
      thickness={thickness}
      withLabels={withLabels}
      withLabelsLine={withLabelsLine}
      withTooltip={withTooltip}
      labelsType={labelsType}
      paddingAngle={paddingAngle}
      startAngle={startAngle}
      endAngle={endAngle}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      tooltipAnimationDuration={tooltipAnimationDuration}
      tooltipDataSource={tooltipDataSource}
      valueFormatter={valueFormatter}
    />
  );
};
