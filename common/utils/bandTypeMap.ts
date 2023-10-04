import { Band, Resistor } from "../types";

export const bandTypeMap: Record<keyof Resistor, keyof Band> = {
  bandA: 'significant',
  bandB: 'significant',
  bandC: 'multiplier',
  bandD: 'tolerancePercentage'
}