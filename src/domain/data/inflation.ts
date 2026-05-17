// Indice dei prezzi al consumo per le famiglie di operai e impiegati (FOI),
// senza tabacchi, base 2015 = 100.
// Usato anche da INPS per la rivalutazione del TFR.
// Fonte: ISTAT — http://dati.istat.it (tema "Prezzi al consumo")
// Ultima verifica: 2026-02-21 — i valori 2025/2026 includono la stima ufficiale
// di rivalutazione (DM MEF 19/11/2025) per il 2026 e la media annua provvisoria
// per il 2025.

export interface InflationDataPoint {
  readonly year: number;
  readonly index: number; // base 2015 = 100
  readonly yoyRate: number; // year-over-year change vs previous year
}

export const FOI_INDEX: ReadonlyArray<InflationDataPoint> = [
  { year: 2015, index: 100.0, yoyRate: 0.001 },
  { year: 2016, index: 100.2, yoyRate: 0.002 },
  { year: 2017, index: 101.4, yoyRate: 0.012 },
  { year: 2018, index: 102.6, yoyRate: 0.012 },
  { year: 2019, index: 103.2, yoyRate: 0.006 },
  { year: 2020, index: 103.0, yoyRate: -0.002 },
  { year: 2021, index: 105.0, yoyRate: 0.019 },
  { year: 2022, index: 113.8, yoyRate: 0.084 },
  { year: 2023, index: 120.3, yoyRate: 0.057 },
  { year: 2024, index: 121.5, yoyRate: 0.01 },
  { year: 2025, index: 123.3, yoyRate: 0.015 },
  { year: 2026, index: 125.2, yoyRate: 0.015 },
];

export const FOI_BASE_YEAR = 2015;
export const FOI_LATEST_YEAR = 2026;
