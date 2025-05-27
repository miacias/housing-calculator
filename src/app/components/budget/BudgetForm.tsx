import {
  Button,
  Container,
  Flex,
  Group,
  NumberFormatter,
  Text,
  Title,
} from "@mantine/core";
import { type ReactElement } from "react";
import {
  IconCoinFilled,
  IconShieldHalfFilled,
  IconPaywall,
  IconHome,
  IconBuildings,
  IconToiletPaper,
} from "@tabler/icons-react";
import { NumberInput } from "../NumberInput";
import { TextInput } from "../TextInput";
import { toTitleCase } from "../../utils/toTitleCase";
import {
  type Income,
  type PayDeductions,
  type NecessaryExpenses,
  type Utilities,
  type RentalExpenses,
  type HouseExpenses,
} from "../../types/budget";

export type BudgetFormProps = {
  section?: "pay-stub" | "monthly-expenses" | "housing-bills";
  newExpenseKey?: string;
  setNewExpenseKey?: (v: string) => void;
  newExpenseValue?: string | number;
  setNewExpenseValue?: (v: string | number) => void;
  income?: Income;
  setIncome?: (v: Income) => void;
  payDeductions?: PayDeductions;
  setPayDeductions?: (v: PayDeductions) => void;
  necessaryExpenses?: NecessaryExpenses;
  setNecessaryExpenses?: (v: NecessaryExpenses) => void;
  utilities?: Utilities;
  setUtilities?: (v: Utilities) => void;
  rentExpenses?: RentalExpenses;
  setRentExpenses?: (v: RentalExpenses) => void;
  houseExpenses?: HouseExpenses;
  setHouseExpenses?: (v: HouseExpenses) => void;
  getTotal: (obj: Record<string, number | string | undefined>) => number;
};

export const BudgetForm = ({
  section,
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
}: BudgetFormProps): ReactElement => {
  const handleObjChange = <T extends Record<string, number | undefined>>(
    key: keyof T,
    value: number | string,
    setter: React.Dispatch<React.SetStateAction<T>>
  ) => {
    setter((prev) => ({
      ...prev,
      [key]:
        typeof value === "number" ? value : parseFloat(value as string) || 0,
    }));
  };

  const handleAddNewExpense = () => {
    if (!newExpenseKey || !newExpenseKey.trim()) return;

    setNecessaryExpenses((prev) => ({
      ...prev,
      [newExpenseKey]:
        parseFloat(
          typeof newExpenseValue === "string"
            ? newExpenseValue
            : String(newExpenseValue ?? "0")
        ) || 0,
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
              <IconCoinFilled color="green" />
              {" Income"}
            </Title>
            <Text c={"green"}>
              <NumberFormatter
                prefix="$ "
                value={income?.monthlyPostTaxPay}
                thousandSeparator
              />
            </Text>
            {income &&
              Object.entries(income).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value}
                  onChange={(val) =>
                    handleObjChange(key as keyof Income, val, setIncome!)
                  }
                  min={0}
                  decimalScale={2}
                  step={100}
                />
              ))}
          </Container>
          <Container className="pay-deductions">
            <Title order={3} c={"orange"}>
              <IconPaywall />
              {" Deductions"}
            </Title>
            <Text c={"red"}>
              <NumberFormatter
                prefix="Total: $ "
                value={getTotal(payDeductions || {})}
                thousandSeparator
              />
            </Text>
            {payDeductions &&
              Object.entries(payDeductions).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value}
                  onChange={(val) =>
                    handleObjChange(
                      key as keyof PayDeductions,
                      val,
                      setPayDeductions!
                    )
                  }
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
              <IconShieldHalfFilled />
              {" Necessary Expenses"}
            </Title>
            <Text c={"red"}>
              <NumberFormatter
                prefix="Total: $ "
                value={getTotal(necessaryExpenses || {})}
                thousandSeparator
              />
            </Text>
            {necessaryExpenses &&
              Object.entries(necessaryExpenses).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value}
                  onChange={(val) =>
                    handleObjChange(
                      key as keyof NecessaryExpenses,
                      val,
                      setNecessaryExpenses!
                    )
                  }
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
                onChange={setNewExpenseValue}
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
              <IconToiletPaper />
              {" Utilities"}
            </Title>
            <Text c={"red"}>
              <NumberFormatter
                prefix="Total: $ "
                value={getTotal(utilities || {})}
                thousandSeparator
              />
            </Text>
            {utilities &&
              Object.entries(utilities).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value}
                  onChange={(val) =>
                    handleObjChange(key as keyof Utilities, val, setUtilities!)
                  }
                  min={0}
                  decimalScale={2}
                  step={10}
                />
              ))}
          </Container>
          <Container className="rent">
            <Title order={3} c={"red"}>
              <IconBuildings />
              {" Rent"}
            </Title>
            <Text c={"red"}>
              <NumberFormatter
                prefix="Total: $ "
                value={getTotal(rentExpenses || {})}
                thousandSeparator
              />
            </Text>
            {rentExpenses &&
              Object.entries(rentExpenses).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value}
                  onChange={(val) =>
                    handleObjChange(
                      key as keyof RentalExpenses,
                      val,
                      setRentExpenses!
                    )
                  }
                  min={0}
                  decimalScale={2}
                  step={10}
                />
              ))}
          </Container>
          <Container className="home">
            <Title order={3} c={"red"}>
              <IconHome />
              {" Home Ownership"}
            </Title>
            <Text c={"red"}>
              <NumberFormatter
                prefix="Total: $ "
                value={getTotal(houseExpenses || {})}
                thousandSeparator
              />
            </Text>
            {houseExpenses &&
              Object.entries(houseExpenses).map(([key, value]) => (
                <NumberInput
                  key={key}
                  label={toTitleCase(key)}
                  value={value}
                  onChange={(val) =>
                    handleObjChange(
                      key as keyof HouseExpenses,
                      val,
                      setHouseExpenses!
                    )
                  }
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
