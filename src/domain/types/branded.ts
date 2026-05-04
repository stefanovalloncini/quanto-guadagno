type Brand<T, B extends string> = T & { readonly __brand: B };

export type EUR = Brand<number, "EUR">;
export type Salary = Brand<number, "Salary">;
export type TaxYear = 2024 | 2025 | 2026;

export type RegionCode =
  | "IT-21"
  | "IT-23"
  | "IT-25"
  | "IT-32"
  | "IT-34"
  | "IT-36"
  | "IT-42"
  | "IT-45"
  | "IT-52"
  | "IT-55"
  | "IT-57"
  | "IT-62"
  | "IT-65"
  | "IT-67"
  | "IT-72"
  | "IT-75"
  | "IT-77"
  | "IT-78"
  | "IT-82"
  | "IT-88";

export const toEur = (n: number): EUR => {
  if (!Number.isFinite(n)) throw new RangeError("EUR must be finite");
  return n as EUR;
};

export const toSalary = (n: number): Salary => {
  if (!Number.isFinite(n) || n < 0) {
    throw new RangeError("Salary must be a non-negative finite number");
  }
  return n as Salary;
};

export const isTaxYear = (n: number): n is TaxYear => n === 2024 || n === 2025 || n === 2026;
