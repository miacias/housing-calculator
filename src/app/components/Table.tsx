import {
  MantineSpacing,
  Table as MantineTable,
  TableData,
  // TableLayout,
  MantineColor,
} from "@mantine/core";
import { ReactElement } from "react";

type TableProps = {
  borderColor: MantineColor;
  captionSide?: "top" | "bottom";
  data: TableData;
  highlightOnHover?: boolean;
  highlightOnHoverColor?: MantineColor;
  horizontalSpacing?: MantineSpacing;
  // layout: TableLayout;
  stickyHeader?: boolean;
  stickyHeaderOffset?: string | number;
  striped?: boolean | "odd" | "even";
  tabularNums?: boolean;
  verticalSpacing?: MantineSpacing;
  withColumnBorders?: boolean;
  withRowBorders?: boolean;
  withTableBorder?: boolean;
};

export const Table = (props: TableProps): ReactElement => {
  return <MantineTable {...props} />;
};
