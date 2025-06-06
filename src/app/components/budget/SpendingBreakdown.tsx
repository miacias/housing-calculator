// import {
//   IconMoneybag,
//   IconHome,
//   IconCheck,
//   IconChartLine,
// } from "@tabler/icons-react";
import { memo } from "react";
import { Tabs, Text, Timeline, Title } from "@mantine/core";
import { BudgetForm } from "./BudgetForm";

export interface SpendingBreakdownProps {
  budget: {
    income: any;
    payDeductions: any;
    utilities: any;
    necessaryExpenses: any;
    rentExpenses: any;
    houseExpenses: any;
  };
  setBudget: React.Dispatch<React.SetStateAction<any>>;
  newExpenseKey: string;
  setNewExpenseKey: (key: string) => void;
  newExpenseValue: string | number;
  setNewExpenseValue: (value: string | number) => void;
  getTotal: (obj: Record<string, number | string | undefined>) => number;
}

export const SpendingBreakdown = ({
  budget,
  setBudget,
  newExpenseKey,
  setNewExpenseKey,
  newExpenseValue,
  setNewExpenseValue,
  getTotal,
}: SpendingBreakdownProps) => {
  // const MemoIconMoneybag = memo(IconMoneybag);
  // const MemoIconHome = memo(IconHome);
  // const MemoIconCheck = memo(IconCheck);
  // const MemoIconChartLine = memo(IconChartLine);
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
        <Timeline.Item title="Step 1: Input Income"
        // bullet={<MemoIconMoneybag />} 
        />
        <Timeline.Item
          title="Step 2: Enter Monthly Expenses"
        // bullet={<MemoIconChartLine />}
        />
        <Timeline.Item
          title="Step 3: Add Housing Bills"
        // bullet={<MemoIconHome />}
        />
        <Timeline.Item
          title="Step 4: Review Totals Above"
        // bullet={<MemoIconCheck />}
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
            budget={budget}
            setBudget={setBudget}
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
            budget={budget}
            setBudget={setBudget}
            getTotal={getTotal}
          />
        </Tabs.Panel>
        <Tabs.Panel value="housing-bills">
          <BudgetForm
            section="housing-bills"
            budget={budget}
            setBudget={setBudget}
            getTotal={getTotal}
          />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
