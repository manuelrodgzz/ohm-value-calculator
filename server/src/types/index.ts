export const COLORS_ARRAY = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white',
  'gold',
  'silver',
  'pink',
  'none'
] as const

export type Color = typeof COLORS_ARRAY[number]

export type Resistor = {
  bandA: Color
  bandB: Color
  bandC: Color
  bandD: Color
}

export type Band = {
  significant?: number
  multiplier?: number
  tolerancePercentage?: number
}

export type AllColorsData = Record<Color, Band>