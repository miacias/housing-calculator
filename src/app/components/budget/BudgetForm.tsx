import {
  Button,
  Container,
  Flex,
  Group,
  NumberFormatter,
  Text,
  Title,
} from "@mantine/core";
import { memo, type ReactElement } from "react";
// import {
//   IconCoinFilled,
//   IconShieldHalfFilled,
//   IconPaywall,
//   IconHome,
//   IconBuildings,
//   IconToiletPaper,
// } from "@tabler/icons-react";
import { NumberInput } from "../NumberInput";
import { TextInput } from "../TextInput";
import { toTitleCase } from "../../utils/toTitleCase";
import {
  type Budget,
} from "../../types/budget";

export type BudgetFormProps = {
  section?: "pay-stub" | "monthly-expenses" | "housing-bills";
  budget: {
    income: any;
    payDeductions: any;
    utilities: any;
    necessaryExpenses: any;
    rentExpenses: any;
    houseExpenses: any;
  };
  setBudget: React.Dispatch<React.SetStateAction<any>>;
  newExpenseKey?: string;
  setNewExpenseKey?: (v: string) => void;
  newExpenseValue?: string | number;
  setNewExpenseValue?: (v: string | number) => void;
  getTotal: (obj: Record<string, number | string | undefined>) => number;
};

export const BudgetForm = ({
  budget,
  setBudget,
  section,
  newExpenseKey,
  setNewExpenseKey,
  newExpenseValue,
  setNewExpenseValue,
  getTotal,
}: BudgetFormProps): ReactElement => {
  // const MemoIconCoinFilled = memo(IconCoinFilled);
  // const MemoIconShieldHalfFilled = memo(IconShieldHalfFilled);
  // const MemoIconPaywall = memo(IconPaywall);
  // const MemoIconHome = memo(IconHome);
  // const MemoIconBuildings = memo(IconBuildings);
  // const MemoIconToiletPaper = memo(IconToiletPaper);
  // State handlers for each budget section
  const handleObjChange = (
    sectionKey: keyof Budget,
    key: string,
    value: number | string
  ) => {
    setBudget((prev: Budget) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [key]: typeof value === "number" ? value : parseFloat(value as string) || 0,
      },
    }));
  };

  const handleAddNewExpense = () => {
    if (!newExpenseKey || !newExpenseKey.trim()) return;

    setBudget((prev: Budget) => ({
      ...prev,
      necessaryExpenses: {
        ...prev.necessaryExpenses,
        [newExpenseKey]: typeof newExpenseValue === "number"
          ? newExpenseValue
          : parseFloat(String(newExpenseValue)) || 0,
      },
    }));
    setNewExpenseKey?.("");
    setNewExpenseValue?.("");
  };

  return (
    <Flex gap="xl" wrap={"wrap"} m={30}>
      {section === "pay-stub" && (
        <>
          <Container className="income">
            <Title order={3} c={"green"}>
              {/* <MemoIconCoinFilled color="green" /> */}
              {" Income"}
            </Title>
            <Text c={"green"}>
              <NumberFormatter
                prefix="$ "
                value={budget?.income?.monthlyPostTaxPay}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </Text>
            {budget.income &&
              Object.entries(budget.income).map(([key, value]) => (
                <NumberInput
                  key={key}
                  // allowLeadingZeros={false}
                  label={toTitleCase(key)}
                  value={value as number | string | undefined}
                  onBlurCommit={(val) => handleObjChange("income", key, val)}
                  min={0}
                  decimalScale={2}
                  step={100}
                />
              ))}
          </Container>
          <Container className="pay-deductions">
            <Title order={3} c={"orange"}>
              {/* <MemoIconPaywall /> */}
              {" Deductions"}
            </Title>
            <Text c={"red"}>
              <NumberFormatter
                prefix="Total: $ "
                value={getTotal(budget.payDeductions || {})}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </Text>
            {budget.payDeductions &&
              Object.entries(budget.payDeductions).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value as number | string | undefined}
                  onBlurCommit={(val) => handleObjChange('payDeductions', key, val)}
                  min={0}
                  decimalScale={2}
                  step={10}
                />
              ))}
          </Container>
        </>
      )}

      {section === "monthly-expenses" && (
        <>
          <Container className="necessary-expenses">
            <Title order={3} c={"pink"}>
              {/* <MemoIconShieldHalfFilled /> */}
              {" Necessary Expenses"}
            </Title>
            <Text c={"red"}>
              <NumberFormatter
                prefix="Total: $ "
                value={getTotal(budget.necessaryExpenses || {})}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </Text>
            {budget.necessaryExpenses &&
              Object.entries(budget.necessaryExpenses).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value as number | string | undefined}
                  onBlurCommit={(val) => handleObjChange('necessaryExpenses', key, val)}
                  min={0}
                  decimalScale={2}
                  step={10}
                />
              ))}
            <Group mt="md" className="add-new-expense">
              <TextInput
                label="New Expense Name"
                placeholder="e.g. Gym Membership"
                value={newExpenseKey}
                onChange={(e) => setNewExpenseKey?.(e.currentTarget.value)}
              />
              <NumberInput
                label="Amount"
                value={newExpenseValue}
                // onChange={setNewExpenseValue}
                onBlurCommit={(val) => setNewExpenseValue?.(val)}
              />
              <Button onClick={handleAddNewExpense}>Add New Expense</Button>
            </Group>
          </Container>
        </>
      )}

      {section === "housing-bills" && (
        <>
          <Container className="utilities">
            <Title order={3} c={"yellow"}>
              {/* <MemoIconToiletPaper /> */}
              {" Utilities"}
            </Title>
            <Text c={"red"}>
              <NumberFormatter
                prefix="Total: $ "
                value={getTotal(budget.utilities || {})}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </Text>
            {budget.utilities &&
              Object.entries(budget.utilities).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value as number | string | undefined}
                  onBlurCommit={(val) => handleObjChange('utilities', key, val)}
                  min={0}
                  decimalScale={2}
                  step={10}
                />
              ))}
          </Container>
          <Container className="rent">
            <Title order={3} c={"red"}>
              {/* <MemoIconBuildings /> */}
              {" Rent"}
            </Title>
            <Text c={"red"}>
              <NumberFormatter
                prefix="Total: $ "
                value={getTotal(budget.rentExpenses || {})}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </Text>
            {budget.rentExpenses &&
              Object.entries(budget.rentExpenses).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value as number | string | undefined}
                  onBlurCommit={(val) => handleObjChange('rentExpenses', key, val)}
                  min={0}
                  decimalScale={2}
                  step={10}
                />
              ))}
          </Container>
          <Container className="home">
            <Title order={3} c={"red"}>
              {/* <MemoIconHome /> */}
              {" Home Ownership"}
            </Title>
            <Text c={"red"}>
              <NumberFormatter
                prefix="Total: $ "
                value={getTotal(budget.houseExpenses || {})}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </Text>
            {budget.houseExpenses &&
              Object.entries(budget.houseExpenses).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value as number | string | undefined}
                  onBlurCommit={(val) => handleObjChange('houseExpenses', key, val)}
                  min={0}
                  decimalScale={2}
                  step={10}
                />
              ))}
          </Container>
        </>
      )}
    </Flex>
  );
};
