export type Income = {
  salary: number;
  monthlyGrossPay: number;
  monthlyPostTaxPay: number;
};

export type PayDeductions = {
  dental: number;
  lifeInsurance: number;
  healthInsurance: number;
  retirement: number;
  vision: number;
};

export type Utilities = {
  electricity: number;
  gas: number;
  water: number;
  sewage: number;
  internet: number;
  phone: number;
};

export type NecessaryExpenses = {
  groceries: number;
  dogFood?: number;
  dogHealth?: number;
  dogDentistry?: number;
  carGasoline: number;
  [key: string]: number | undefined;
};

export type RentalExpenses = {
  rent: number;
  parking: number;
  rentersInsurance: number;
  [key: string]: number | undefined;
};

export type HouseExpenses = {
  mortgage: number;
  mortgageInsurance: number;
  homeInsurance: number;
  floodInsurance: number;
  propertyTax: number;
  homeWarranty: number;
  carInsurance: number;
  [key: string]: number | undefined;
};

export type Budget = {
  income: Income;
  payDeductions: PayDeductions;
  utilities: Utilities;
  necessaryExpenses: NecessaryExpenses;
  rentExpenses: RentalExpenses;
  houseExpenses: HouseExpenses;
};