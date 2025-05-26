import { useEffect, useState } from "react";
import { SegmentedControl, Tabs, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  type Income,
  type PayDeductions,
  type Utilities,
  type NecessaryExpenses,
  type RentalExpenses,
  type HouseExpenses,
} from "./app/types/budget";
import { DonutChart } from "./app/components/DonutChart";
import { Layout } from "./app/components/Layout";
import { version, name } from "package.json";
import { BudgetForm } from "./app/components/budget/BudgetForm";

export const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [chart, setChart] = useState("renting");
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

  async function fetchLastUpdated(): Promise<string | null> {
    try {
      const response = await fetch(GITHUB_API_URL);
      const data = await response.json();
      // The commit date is in data.commit.committer.date
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
      color: "purple",
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
      <Title order={1} mb="md">
        {name} <span style={{ fontSize: "0.8em" }}>v{version}</span>
      </Title>
      <Text mb="md">
        This is a budgeting app to help you visualize your monthly expenses and
        income. It allows you to compare renting vs owning a home, and see how
        your expenses stack up against your income.
      </Text>
      <Text mb="md">
        <strong>Disclaimer:</strong> This is a work in progress and is not meant to
        be a complete budgeting solution. It is meant to be a starting point for
        your budgeting needs. Feel free to contribute to the project on{" "}
        <a
          href="https://www.github.com/miacias/housing-calculator"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </Text>
      {/* <Text mb="md">
        <strong>Current Chart:</strong>{" "}
        {chart.charAt(0).toUpperCase() + chart.slice(1)}
      </Text>
      <Text mb="md">
        <strong>Current Tab:</strong>{" "}
        {parentTab.charAt(0).toUpperCase() + parentTab.slice(1)}
      </Text>
      <Text mb="md">
        <strong>Version:</strong> {version}
      </Text> */}
      <Text mb="md">
        <strong>Last Updated:</strong>{" "}
        {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : "Loading..."}
      </Text>
      <SegmentedControl
        fullWidth
        value={chart}
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
      )}

      {parentTab === "analysis" && <Text>Analysis coming soon...</Text>}
    </Layout>
  );
};
