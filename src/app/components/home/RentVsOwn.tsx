import {
  Container,
  Flex,
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
  chart,
  setChart,
  income,
  rentingData,
  owningData,
  totalRentExpenses,
  totalHouseExpenses,
}: RentVsOwnProps) => {
  return (
    <Container size={"lg"} py="xl">
      <Title order={3} mb="md">
        Housing Cost Comparison
      </Title>
      <Text mb="md" className="comparison-description">
        Compare the costs of renting versus owning a hom to help illustrate
        financial commitments and make informed decisions.
      </Text>

      <SegmentedControl
        fullWidth
        value={chart}
        mb="md"
        onChange={setChart}
        data={[
          {
            label: "Renting",
            value: "renting",
          },
          {
            label: "Owning",
            value: "owning",
          },
        ]}
      />
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
      >
        {/* <Stack className="snapshot-details" w="50%"> */}
        <Stack style={{ flex: 1, minWidth: 0 }}>
          <Text className="monthly-income">
            <Text span fw={700}>
              Monthly Post-Tax Pay:
            </Text>
            <NumberFormatter />
            <Text span c="green">
              <NumberFormatter
                prefix=" $"
                value={income.monthlyPostTaxPay}
                thousandSeparator
              />
            </Text>
          </Text>
          <Text className="total-expenses">
            <Text span fw={700}>
              Total Monthly Expenses:
            </Text>
            <NumberFormatter />
            <Text span c="red">
              <NumberFormatter
                prefix=" $"
                value={
                  chart === "renting" ? totalRentExpenses : totalHouseExpenses
                }
                thousandSeparator
              />
            </Text>
          </Text>
          <Text className="remaining-balance">
            <Text span fw={700}>
              Remaining Balance:
            </Text>
            <Text span c="blue">
              <NumberFormatter
                prefix=" $"
                value={
                  chart === "renting"
                    ? income.monthlyPostTaxPay - totalRentExpenses
                    : income.monthlyPostTaxPay - totalHouseExpenses
                }
                thousandSeparator
              />
            </Text>
          </Text>
        </Stack>
        <div
          style={{ minWidth: 220, display: "flex", justifyContent: "center" }}
        >
          {chart === "renting" && (
            <DonutChart
              size={100}
              h={200}
              w={200}
              chartLabel={"balance"}
              data={rentingData}
              withLabelsLine={false}
              labelsType="percent"
            />
          )}
          {chart === "owning" && (
            <DonutChart
              size={100}
              h={200}
              w={200}
              chartLabel={"balance"}
              data={owningData}
              withLabelsLine={false}
              labelsType="percent"
            />
          )}
        </div>
      </Flex>
    </Container>
  );
};
