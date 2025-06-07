import {
  Container,
  Flex,
  Group,
  NumberFormatter,
  SegmentedControl,
  Stack,
  Table,
  Title,
  Text,
} from "@mantine/core";
import { DonutChart } from "../DonutChart";

type RentVsOwnProps = {
  chart: "renting" | "owning";
  setChart: (value: "renting" | "owning") => void;
  income: {
    monthlyPostTaxPay: number;
  };
  rentingData: { label: string; value: number }[];
  owningData: { label: string; value: number }[];
  totalRentExpenses: number;
  totalHouseExpenses: number;
};

export const RentVsOwn = ({
  // chart,
  // setChart,
  income,
  rentingData,
  owningData,
  totalRentExpenses,
  totalHouseExpenses,
}: RentVsOwnProps) => {
  const monthlySummary = [
    {
      housingType: "Renting",
      totalExpense: totalRentExpenses,
      remainingBalance: income.monthlyPostTaxPay - totalRentExpenses,
    },
    {
      housingType: "Owning",
      totalExpense: totalHouseExpenses,
      remainingBalance: income.monthlyPostTaxPay - totalHouseExpenses,
    },
  ];

  const rows = monthlySummary.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.housingType}</Table.Td>
      <Table.Td>{element.totalExpense}</Table.Td>
      <Table.Td>{element.remainingBalance}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={3} mb="md">
        Housing Cost Comparison
      </Title>
      <Text mb="md" className="comparison-description">
        Compare the costs of renting versus owning a home to help illustrate
        financial commitments and make informed decisions.
      </Text>

      <Title order={4} mb="md">
        Spending Snapshot
      </Title>
      <Text className="snapshot-description" mb="md">
        A quick overview of your monthly income and expenses. This is your
        financial situation at a glance.
      </Text>

      <Flex
        className="snapshot-details"
        justify="space-between"
        mb="md"
        // align="center"
        wrap={"wrap"}
      >
        <Stack>
          <Text span fw={700}>
            Monthly Post-Tax Pay:
          </Text>

          <Text span c="green">
            <NumberFormatter
              prefix=" $"
              value={income.monthlyPostTaxPay}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </Text>

          <Table>
            <Table.Thead>
              <Table.Th>Housing Type</Table.Th>
              <Table.Th>Monthly Expenses</Table.Th>
              <Table.Th>Monthly Remaining Balance</Table.Th>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Stack>

        <DonutChart
          className="renting-snapshot"
          size={200}
          chartLabel={"Renting"}
          data={rentingData}
          withLabelsLine={false}
          labelsType="percent"
        />

        <DonutChart
          className="owning-snapshot"
          size={200}
          chartLabel={"Owning"}
          data={owningData}
          withLabelsLine={false}
          labelsType="percent"
        />
      </Flex>
    </>
  );
};
