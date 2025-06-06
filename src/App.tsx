import { useEffect, useState, useRef } from "react";
import {
  Container,
  SegmentedControl,
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
  type Budget,
} from "./app/types/budget";
import { Layout } from "./app/components/Layout";
import { Introduction } from "./app/components/home/Introduction";
import { version, name } from "package.json";
import { RentVsOwn } from "./app/components/home/RentVsOwn";
import { SpendingBreakdown } from "./app/components/budget/SpendingBreakdown";

export const App = () => {
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const [opened, { toggle }] = useDisclosure();
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [chart, setChart] = useState<"renting" | "owning">("renting");
  const [parentTab, setParentTab] = useState<"budget" | "analysis">("budget");
  const [newExpenseKey, setNewExpenseKey] = useState("");
  const [newExpenseValue, setNewExpenseValue] = useState<string | number>("");
  const [budget, setBudget] = useState<Budget>({
    income: {
      salary: 0,
      monthlyGrossPay: 0,
      monthlyPostTaxPay: 0,
    },
    payDeductions: {
      dental: 0,
      lifeInsurance: 0,
      healthInsurance: 0,
      retirement: 0,
      vision: 0,
    },
    utilities: {
      electricity: 0,
      gas: 0,
      water: 0,
      sewage: 0,
      internet: 0,
      phone: 0,
    },
    necessaryExpenses: {
      groceries: 0,
      dogFood: 0,
      dogHealth: 0,
      dogDentistry: 0,
      carGasoline: 0,
    },
    rentExpenses: {
      rent: 0,
      parking: 0,
      rentersInsurance: 0,
    },
    houseExpenses: {
      mortgage: 0,
      mortgageInsurance: 0,
      homeInsurance: 0,
      floodInsurance: 0,
      propertyTax: 0,
      homeWarranty: 0,
      carInsurance: 0,
    },
  });
  const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;

  const fetchLastUpdated = async (): Promise<string | null> => {
    try {
      const response = await fetch(GITHUB_API_URL);
      const data = await response.json();
      return data.commit?.committer?.date || null;
    } catch {
      return null;
    }
  };

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
    getTotal(budget.payDeductions) +
    getTotal(budget.utilities) +
    getTotal(budget.necessaryExpenses) +
    getTotal(budget.rentExpenses);

  const totalHouseExpenses =
    getTotal(budget.payDeductions) +
    getTotal(budget.utilities) +
    getTotal(budget.necessaryExpenses) +
    getTotal(budget.houseExpenses);

  const renting = {
    name: "Rent",
    value: getTotal(budget.rentExpenses) || 20,
    color: "red",
  };

  const owning = {
    name: "Home Ownership",
    value: getTotal(budget.houseExpenses) || 20,
    color: "red",
  };

  const donutData = [
    {
      name: "Pay Deductions",
      value: getTotal(budget.payDeductions) || 20,
      color: "orange",
    },
    {
      name: "Necessary Expenses",
      value: getTotal(budget.necessaryExpenses) || 20,
      color: "pink",
    },
    {
      name: "Utilities",
      value: getTotal(budget.utilities) || 10,
      color: "yellow",
    },
    {
      name: "Remaining",
      value:
        chart === "renting"
          ? budget.income.monthlyPostTaxPay - totalRentExpenses || 30
          : budget.income.monthlyPostTaxPay - totalHouseExpenses || 20,
      color: "blue",
    },
  ];

  const rentingData = [...donutData, renting];
  const owningData = [...donutData, owning];

  // useEffect(() => {
  //   const saved = localStorage.getItem("budget");
  //   if (saved) {
  //     const parsed = JSON.parse(saved);
  //     setBudget(parsed);
  //   }
  //   fetchLastUpdated().then(setLastUpdated);
  // }, []);

  // saves to localStorage
  // useEffect(() => {
  //   localStorage.setItem("budget", JSON.stringify(budget));
  // }, [budget]);
  // useEffect(() => {
  //   if (saveTimeout.current) clearTimeout(saveTimeout.current);
  //   saveTimeout.current = setTimeout(() => {
  //     localStorage.setItem("budget", JSON.stringify(budget));
  //   }, 300); // Save after 300ms of inactivity
  //   return () => clearTimeout(saveTimeout.current!);
  // }, [budget]);

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
        income={budget.income}
        rentingData={rentingData}
        owningData={owningData}
      />

      <Container size={'xl'}>
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
          <SpendingBreakdown
            budget={budget}
            setBudget={setBudget}
            newExpenseKey={newExpenseKey}
            setNewExpenseKey={setNewExpenseKey}
            newExpenseValue={newExpenseValue}
            setNewExpenseValue={setNewExpenseValue}
            getTotal={getTotal}
          />
        )}

        {parentTab === "analysis" && <Text>Analysis coming soon...</Text>}
      </Container>
    </Layout>
  );
};
