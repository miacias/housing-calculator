import {
  IconMoneybag,
  IconHome,
  IconCheck,
  IconChartLine,
} from "@tabler/icons-react";
import { Tabs, Text, Timeline, Title } from "@mantine/core";
import { BudgetForm, type BudgetFormProps } from "./BudgetForm";

export const SpendingBreakdown = ({
  newExpenseKey,
  setNewExpenseKey,
  newExpenseValue,
  setNewExpenseValue,
  income,
  setIncome,
  payDeductions,
  setPayDeductions,
  necessaryExpenses,
  setNecessaryExpenses,
  utilities,
  setUtilities,
  rentExpenses,
  setRentExpenses,
  houseExpenses,
  setHouseExpenses,
  getTotal,
}: BudgetFormProps) => {
  return (
    <>
      <Title order={2} mb="md">
        Spending Breakdown
      </Title>
      <Text mb="md">
        This section allows you to input your income, pay deductions, and
        various expenses to get a clear picture of your monthly budget.
      </Text>
      <Text mb="md">
        Use the tabs below to navigate through different sections of your
        budget:
      </Text>
      <Timeline mb="md" active={1} bulletSize={24} lineWidth={2}>
        <Timeline.Item title="Step 1: Input Income" bullet={<IconMoneybag />} />
        <Timeline.Item
          title="Step 2: Enter Monthly Expenses"
          bullet={<IconChartLine />}
        />
        <Timeline.Item
          title="Step 3: Add Housing Bills"
          bullet={<IconHome />}
        />
        <Timeline.Item
          title="Step 4: Review Totals Above"
          bullet={<IconCheck />}
        />
      </Timeline>

      <Text mb="md" c={"dimmed"}>
        Note: Ensure that all amounts are entered in the same currency and
        format for accurate calculations.
      </Text>
      <Text mb="md">
        Happy budgeting! Remember, a well-planned budget is the key to financial
        success.
      </Text>
      <Tabs defaultValue="pay-stub" orientation="vertical" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="pay-stub">Pay Stub</Tabs.Tab>
          <Tabs.Tab value="monthly-expenses">Monthly Expenses</Tabs.Tab>
          <Tabs.Tab value="housing-bills">Housing Bills</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="pay-stub">
          <BudgetForm
            section="pay-stub"
            newExpenseKey={newExpenseKey}
            setNewExpenseKey={setNewExpenseKey}
            newExpenseValue={newExpenseValue}
            setNewExpenseValue={setNewExpenseValue}
            income={income}
            setIncome={setIncome}
            payDeductions={payDeductions}
            setPayDeductions={setPayDeductions}
            getTotal={getTotal}
          />
        </Tabs.Panel>
        <Tabs.Panel value="monthly-expenses">
          <BudgetForm
            section="monthly-expenses"
            newExpenseKey={newExpenseKey}
            setNewExpenseKey={setNewExpenseKey}
            newExpenseValue={newExpenseValue}
            setNewExpenseValue={setNewExpenseValue}
            necessaryExpenses={necessaryExpenses}
            setNecessaryExpenses={setNecessaryExpenses}
            getTotal={getTotal}
          />
        </Tabs.Panel>
        <Tabs.Panel value="housing-bills">
          <BudgetForm
            section="housing-bills"
            utilities={utilities}
            setUtilities={setUtilities}
            rentExpenses={rentExpenses}
            setRentExpenses={setRentExpenses}
            houseExpenses={houseExpenses}
            setHouseExpenses={setHouseExpenses}
            getTotal={getTotal}
          />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
