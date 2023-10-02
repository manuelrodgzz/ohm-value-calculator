import { AllColorsData, Band, Color, Resistor } from "common"
import ValidationError from "../errors/validation"

type ValidataeResistorFn = (
  resistor: Resistor,
  colorsData: AllColorsData
) => { bandName: string, bandColor: Color } | false

const bandMap: Record<keyof Resistor, keyof Band> = {
  bandA: 'significant',
  bandB: 'significant',
  bandC: 'multiplier',
  bandD: 'tolerancePercentage'
}

const validateResistor: ValidataeResistorFn = (resistor, colorsData) => {
  const invalidBand = Object.entries(resistor).find(
    ([band, color]) => {
      const propToCheck = bandMap[band as keyof typeof resistor]
      return colorsData[color][propToCheck] === undefined      
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

const ohmValueCalculator = (resistor: Resistor, colorsData: AllColorsData): number => {

  const invalidBand = validateResistor(resistor, colorsData)

  if (invalidBand) {
    throw new ValidationError(`Band ${invalidBand.bandName} can not use color ${invalidBand.bandColor}`)
  }

  const { bandA, bandB, bandC } = resistor
  const significant1 = colorsData[bandA].significant
  const significant2 = colorsData[bandB].significant
  const multiplier = colorsData[bandC].multiplier as number

  return Number(`${significant1}${significant2}`) * multiplier
}

export default ohmValueCalculator