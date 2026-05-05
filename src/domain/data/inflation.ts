export interface InflationEntry {
  readonly year: number;
  readonly rate: number;
}

export const ITALIAN_INFLATION_FOI: ReadonlyArray<InflationEntry> = [
  { year: 2010, rate: 0.015 },
  { year: 2011, rate: 0.028 },
  { year: 2012, rate: 0.03 },
  { year: 2013, rate: 0.012 },
  { year: 2014, rate: 0.002 },
  { year: 2015, rate: 0 },
  { year: 2016, rate: -0.001 },
  { year: 2017, rate: 0.011 },
  { year: 2018, rate: 0.011 },
  { year: 2019, rate: 0.005 },
  { year: 2020, rate: -0.002 },
  { year: 2021, rate: 0.019 },
  { year: 2022, rate: 0.081 },
  { year: 2023, rate: 0.057 },
  { year: 2024, rate: 0.011 },
  { year: 2025, rate: 0.012 },
  { year: 2026, rate: 0.014 },
];
