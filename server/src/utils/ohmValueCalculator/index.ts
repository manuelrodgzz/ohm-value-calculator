import { ColorsData, Band, Color, Resistor, bandTypeMap } from "common"
import ValidationError from "../errors/validation"

type ValidataeResistorFn = (
  resistor: Resistor,
  colorsData: ColorsData
) => { bandName: string, bandColor: Color } | false

const validateResistor: ValidataeResistorFn = (resistor, colorsData) => {
  const invalidBand = Object.entries(resistor).find(
    ([band, color]) => {
      const propToCheck = bandTypeMap[band as keyof typeof resistor]
      return (colorsData[color] as Band)[propToCheck] === undefined      
    }
  )
  
  if (invalidBand) {
    const bandLetter = invalidBand[0][invalidBand[0].length - 1]
    return {
      bandName: bandLetter,
      bandColor: invalidBand[1]
    }
  }

  return false
}

const checkIfMissingColorsData = (resistor: Resistor, colorsData: ColorsData): Color | false => {
  for (const band of Object.values(resistor)) {
    if (!(band in colorsData)) {
      return band
    }
  }

  return false
}

const ohmValueCalculator = (resistor: Resistor, colorsData: ColorsData): number => {

  const missingColor = checkIfMissingColorsData(resistor, colorsData)

  if (missingColor) {
    throw new ValidationError(`Color ${missingColor} was not retrieved from the DB.`)
  }

  const invalidBand = validateResistor(resistor, colorsData)

  if (invalidBand) {
    throw new ValidationError(`Band ${invalidBand.bandName} can not use color ${invalidBand.bandColor}.`)
  }

  const { bandA, bandB, bandC } = resistor
  const significant1 = (colorsData[bandA] as Band).significant
  const significant2 = (colorsData[bandB] as Band).significant
  const multiplier = (colorsData[bandC] as Band).multiplier as number

  return Number(`${significant1}${significant2}`) * multiplier
}

export default ohmValueCalculator