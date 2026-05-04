import type { TaxYear, RegionCode } from "@/domain/types";

export interface SourceReference {
  readonly title: string;
  readonly url: string;
  readonly lastVerified: string;
}

export interface YearlyTaxConfig {
  readonly year: TaxYear;
  readonly sources: ReadonlyArray<SourceReference>;
}

export interface RegionConfig {
  readonly code: RegionCode;
  readonly name: string;
}

export interface TaxDataPort {
  listYears(): Promise<ReadonlyArray<TaxYear>>;
  getYear(year: TaxYear): Promise<YearlyTaxConfig>;
  listRegions(): Promise<ReadonlyArray<RegionConfig>>;
  getRegion(code: RegionCode): Promise<RegionConfig>;
}
