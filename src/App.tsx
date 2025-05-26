import { useEffect, useState } from "react";
import {
  Container,
  SegmentedControl,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  type Income,
  type PayDeductions,
  type Utilities,
  type NecessaryExpenses,
  type RentalExpenses,
  type HouseExpenses,
} from "./app/types/budget";
import { Layout } from "./app/components/Layout";
import { BudgetForm } from "./app/components/budget/BudgetForm";
import { Introduction } from "./app/components/home/Introduction";
import { version, name } from "package.json";
import { RentVsOwn } from "./app/components/home/RentVsOwn";

export const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [chart, setChart] = useState<"renting" | "owning">("renting");
  const [parentTab, setParentTab] = useState<"budget" | "analysis">("budget");
  const [newExpenseKey, setNewExpenseKey] = useState("");
  const [newExpenseValue, setNewExpenseValue] = useState<string | number>("");
  const [income, setIncome] = useState<Income>({
    salary: 0,
    monthlyGrossPay: 0,
    monthlyPostTaxPay: 0,
  });
  const [payDeductions, setPayDeductions] = useState<PayDeductions>({
    dental: 0,
    lifeInsurance: 0,
    healthInsurance: 0,
    retirement: 0,
    vision: 0,
  });
  const [utilities, setUtilities] = useState<Utilities>({
    electricity: 0,
    gas: 0,
    water: 0,
    sewage: 0,
    internet: 0,
    phone: 0,
  });
  const [necessaryExpenses, setNecessaryExpenses] = useState<NecessaryExpenses>(
    {
      groceries: 0,
      dogFood: 0,
      dogHealth: 0,
      dogDentistry: 0,
      carGasoline: 0,
    }
  );
  const [rentExpenses, setRentExpenses] = useState<RentalExpenses>({
    rent: 0,
    parking: 0,
    rentersInsurance: 0,
  });
  const [houseExpenses, setHouseExpenses] = useState<HouseExpenses>({
    mortgage: 0,
    mortgageInsurance: 0,
    homeInsurance: 0,
    floodInsurance: 0,
    propertyTax: 0,
    homeWarranty: 0,
    carInsurance: 0,
  });
  const GITHUB_API_URL =
    "https://api.github.com/repos/miacias/housing-calculator/commits/main";

  const fetchLastUpdated = async (): Promise<string | null> => {
    try {
      const response = await fetch(GITHUB_API_URL);
      const data = await response.json();
      return data.commit?.committer?.date || null;
    } catch {
      return null;
    }
  }

  const getTotal = (
    object: Record<string, number | string | undefined>
  ): number => {
    let sum = 0;
    for (const key in object) {
      const value = object[key];
      sum +=
        typeof value === "number" ? value : parseFloat(value as string) || 0;
    }
    return sum;
  };

  const totalRentExpenses =
    getTotal(payDeductions) +
    getTotal(utilities) +
    getTotal(necessaryExpenses) +
    getTotal(rentExpenses);

  const totalHouseExpenses =
    getTotal(payDeductions) +
    getTotal(utilities) +
    getTotal(necessaryExpenses) +
    getTotal(houseExpenses);

  const renting = {
    name: "Rent",
    value: getTotal(rentExpenses) || 20,
    color: "red",
  };

  const owning = {
    name: "Home Ownership",
    value: getTotal(houseExpenses) || 20,
    color: "red",
  };

  const donutData = [
    {
      name: "Pay Deductions",
      value: getTotal(payDeductions) || 20,
      color: "orange",
    },
    {
      name: "Necessary Expenses",
      value: getTotal(necessaryExpenses) || 20,
      color: "pink",
    },
    {
      name: "Utilities",
      value: getTotal(utilities) || 10,
      color: "yellow",
    },
    {
      name: "Remaining",
      value:
        chart === "renting"
          ? income.monthlyPostTaxPay - totalRentExpenses || 30
          : income.monthlyPostTaxPay - totalHouseExpenses || 20,
      color: "blue",
    },
  ];

  const rentingData = [...donutData, renting];
  const owningData = [...donutData, owning];

  useEffect(() => {
    fetchLastUpdated().then(setLastUpdated);
  }, []);

  return (
    <Layout opened={opened} toggle={toggle} name={name} version={version}>
      <Introduction
        name={name}
        version={version}
        lastUpdated={lastUpdated}
        chart={chart}
        parentTab={parentTab}
      />
      <RentVsOwn
        chart={chart}
        setChart={setChart}
        totalRentExpenses={totalRentExpenses}
        totalHouseExpenses={totalHouseExpenses}
        income={income}
        rentingData={rentingData}
        owningData={owningData}
      />

      <SegmentedControl
        fullWidth
        value={parentTab}
        onChange={(value) => setParentTab(value as "budget" | "analysis")}
        data={[
          { label: "Budget", value: "budget" },
          { label: "Analysis", value: "analysis" },
        ]}
        mb="md"
      />

      {parentTab === "budget" && (
        <Container>
          <Title order={2} mb="md">
            Spending Breakdown
          </Title>
          <Text mb="md">
            This section allows you to input your income, pay deductions, and various expenses to get a clear picture of your monthly budget.
          </Text>
          <Text mb="md">
            Use the tabs below to navigate through different sections of your budget:
          </Text>
          <Text mb="md">
            1. <strong>Pay Stub</strong>: Input your income and deductions.
          </Text>
          <Text mb="md">
            2. <strong>Monthly Expenses</strong>: Enter your necessary monthly expenses.
          </Text>
          <Text mb="md">
            3. <strong>Housing Bills</strong>: Add your housing-related expenses, whether renting or owning.
          </Text>
          <Text mb="md">
            The totals will automatically update as you enter your data, giving you a clear view of your financial situation.
          </Text>
          <Text mb="md">
            Note: Ensure that all amounts are entered in the same currency and format for accurate calculations.
          </Text>
          <Text mb="md">
            If you have any questions or need assistance, please refer to the documentation or contact support.
          </Text>
          <Text mb="md">
            Happy budgeting! Remember, a well-planned budget is the key to financial success.
          </Text>
          <Tabs defaultValue="pay-stub" orientation="vertical" variant="pills">
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
        </Container>
      )}

      {parentTab === "analysis" && <Text>Analysis coming soon...</Text>}
    </Layout>
  );
};
