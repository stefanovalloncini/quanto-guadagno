import type { Region, RegionCode } from "./types.ts";

// Italian regional addizionale IRPEF brackets.
// Fonte: delibere regionali pubblicate sul sito Finanze MEF.
// Aliquote in vigore per il periodo d'imposta 2024 (prorogate al 2025 e 2026
// salvo nuove delibere regionali).
export const REGIONS: Record<RegionCode, Region> = {
  piemonte: {
    code: "piemonte",
    name: "Piemonte",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.0162 },
      { min: 15_000, max: 28_000, rate: 0.0213 },
      { min: 28_000, max: 50_000, rate: 0.0275 },
      { min: 50_000, max: null, rate: 0.0333 },
    ],
  },
  "valle-daosta": {
    code: "valle-daosta",
    name: "Valle d'Aosta",
    taxBrackets: [{ min: 0, max: null, rate: 0.0123 }],
    exemptionThreshold: 15_000,
  },
  lombardia: {
    code: "lombardia",
    name: "Lombardia",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.0123 },
      { min: 15_000, max: 28_000, rate: 0.0158 },
      { min: 28_000, max: 50_000, rate: 0.0172 },
      { min: 50_000, max: null, rate: 0.0173 },
    ],
  },
  bolzano: {
    code: "bolzano",
    name: "Provincia Autonoma di Bolzano",
    taxBrackets: [
      { min: 0, max: 50_000, rate: 0.0123 },
      { min: 50_000, max: null, rate: 0.0173 },
    ],
    taxDeduction: { amount: 430.5, incomeCeiling: 90_000 },
  },
  trento: {
    code: "trento",
    name: "Provincia Autonoma di Trento",
    taxBrackets: [
      { min: 0, max: 50_000, rate: 0.0123 },
      { min: 50_000, max: null, rate: 0.0173 },
    ],
    exemptionThreshold: 30_000,
  },
  veneto: {
    code: "veneto",
    name: "Veneto",
    taxBrackets: [{ min: 0, max: null, rate: 0.0123 }],
  },
  "friuli-venezia-giulia": {
    code: "friuli-venezia-giulia",
    name: "Friuli-Venezia Giulia",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.007 },
      { min: 15_000, max: null, rate: 0.0123 },
    ],
  },
  liguria: {
    code: "liguria",
    name: "Liguria",
    taxBrackets: [
      { min: 0, max: 28_000, rate: 0.0123 },
      { min: 28_000, max: 50_000, rate: 0.0318 },
      { min: 50_000, max: null, rate: 0.0323 },
    ],
  },
  "emilia-romagna": {
    code: "emilia-romagna",
    name: "Emilia-Romagna",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.0133 },
      { min: 15_000, max: 28_000, rate: 0.0193 },
      { min: 28_000, max: 50_000, rate: 0.0203 },
      { min: 50_000, max: null, rate: 0.0227 },
    ],
  },
  toscana: {
    code: "toscana",
    name: "Toscana",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.0142 },
      { min: 15_000, max: 28_000, rate: 0.0143 },
      { min: 28_000, max: 50_000, rate: 0.0332 },
      { min: 50_000, max: null, rate: 0.0333 },
    ],
  },
  umbria: {
    code: "umbria",
    name: "Umbria",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.0123 },
      { min: 15_000, max: 28_000, rate: 0.0162 },
      { min: 28_000, max: 50_000, rate: 0.0167 },
      { min: 50_000, max: null, rate: 0.0183 },
    ],
  },
  marche: {
    code: "marche",
    name: "Marche",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.0123 },
      { min: 15_000, max: 28_000, rate: 0.0153 },
      { min: 28_000, max: 50_000, rate: 0.017 },
      { min: 50_000, max: null, rate: 0.0173 },
    ],
  },
  lazio: {
    code: "lazio",
    name: "Lazio",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.0173 },
      { min: 15_000, max: null, rate: 0.0333 },
    ],
  },
  abruzzo: {
    code: "abruzzo",
    name: "Abruzzo",
    taxBrackets: [
      { min: 0, max: 28_000, rate: 0.0167 },
      { min: 28_000, max: 50_000, rate: 0.0287 },
      { min: 50_000, max: null, rate: 0.0333 },
    ],
  },
  molise: {
    code: "molise",
    name: "Molise",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.0203 },
      { min: 15_000, max: 28_000, rate: 0.0223 },
      { min: 28_000, max: null, rate: 0.0363 },
    ],
  },
  campania: {
    code: "campania",
    name: "Campania",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.0173 },
      { min: 15_000, max: 28_000, rate: 0.0296 },
      { min: 28_000, max: 50_000, rate: 0.032 },
      { min: 50_000, max: null, rate: 0.0333 },
    ],
  },
  puglia: {
    code: "puglia",
    name: "Puglia",
    taxBrackets: [
      { min: 0, max: 15_000, rate: 0.0133 },
      { min: 15_000, max: 28_000, rate: 0.0143 },
      { min: 28_000, max: 50_000, rate: 0.0163 },
      { min: 50_000, max: null, rate: 0.0185 },
    ],
  },
  basilicata: {
    code: "basilicata",
    name: "Basilicata",
    taxBrackets: [{ min: 0, max: null, rate: 0.0123 }],
  },
  calabria: {
    code: "calabria",
    name: "Calabria",
    taxBrackets: [{ min: 0, max: null, rate: 0.0173 }],
  },
  sicilia: {
    code: "sicilia",
    name: "Sicilia",
    taxBrackets: [{ min: 0, max: null, rate: 0.0123 }],
  },
  sardegna: {
    code: "sardegna",
    name: "Sardegna",
    taxBrackets: [{ min: 0, max: null, rate: 0.0123 }],
  },
};

export const REGIONS_LIST: readonly Region[] = Object.values(REGIONS).sort((a, b) =>
  a.name.localeCompare(b.name, "it"),
);
