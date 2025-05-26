import { useState } from "react";
import {
  AppShell,
  Burger,
  Code,
  SegmentedControl,
  Tabs,
  Text,
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
import { DonutChart } from "./app/components/DonutChart";
import { Layout } from "./app/components/Layout";
import { version, name } from "package.json";
import { BudgetForm } from "./app/components/budget/BudgetForm";

export const App = () => {
  const [opened, { toggle }] = useDisclosure();
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

  return (
    <Layout opened={opened} toggle={toggle} name={name} version={version}>
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
