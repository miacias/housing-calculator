import {
  Container,
  Flex,
  Group,
  NumberFormatter,
  SegmentedControl,
  Stack,
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
        align="center"
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
        </Stack>
        <Stack className="renting-snapshot">
          <Title order={5}>Renting</Title>
          
          <DonutChart
            size={200}
            // chartLabel={"balance"}
            chartLabel={`Remaining: $${income.monthlyPostTaxPay - totalRentExpenses}`}
            data={rentingData}
            withLabelsLine={false}
            labelsType="percent"
          />
          
          <Group className="total-expenses">
            <Text span fw={700}>
              Total Renting Monthly Expenses:
            </Text>
            <Text span c="red">
              <NumberFormatter
                prefix=" $"
                value={totalRentExpenses}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </Text>
          </Group>
        </Stack>

        <Stack className="owning-snapshot">
          <Title order={5}>Owning</Title>

          <DonutChart
            size={200}
            // chartLabel={"balance"}
            chartLabel={`Remaining: $${income.monthlyPostTaxPay - totalHouseExpenses}`}
            data={owningData}
            withLabelsLine={false}
            labelsType="percent"
          />

          <Group className="total-expenses">
            <Text span fw={700}>
              Total Owning Monthly Expenses:
            </Text>
            <Text span c="red">
              <NumberFormatter
                prefix=" $"
                value={totalHouseExpenses}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </Text>
          </Group>
        </Stack>
      </Flex>
    </>
  );
};
