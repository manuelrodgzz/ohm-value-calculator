import { Color, colorsData } from 'common'
import ohmValueCalculator from '.'
import ValidationError from '../errors/validation'

const getResult = (bandA: Color, bandB: Color, bandC: Color, bandD: Color) => ohmValueCalculator(
  {
    bandA,
    bandB,
    bandC,
    bandD
  },
  colorsData
)

type Test = {
  args: [Color, Color, Color, Color]
  error?: boolean
}

const fourBandScenarios: Test[] = [
  {
    args: ['red', 'green', 'orange', 'gold'],
  },
  {
    args: ['green', 'blue', 'yellow', 'gold'],
  },
  {
    args: ['yellow', 'violet', 'brown', 'gold'],
  },
  {
    args: ['blue', 'grey', 'black', 'gold'],
  },
  {
    args: ['brown', 'black', 'red', 'gold'],
  },
  {
    args: ['black', 'red', 'white', 'silver'],
  },
  {
    args: ['violet', 'white', 'silver', 'red'],
  },
  {
    args: ['orange', 'yellow', 'green', 'blue'],
  },
  {
    args: ['grey', 'brown', 'blue', 'yellow'],
  },
  {
    args: ['white', 'orange', 'violet', 'brown'],
  },
  {
    args: ['grey', 'grey', 'grey', 'grey'],
  },
]

const invalidBandScenarios: Test[] = [
  {
    args: ['pink', 'green', 'white', 'violet'],
    error: true
  },
  {
    args: ['black', 'silver', 'white', 'violet'],
    error: true
  },
  {
    args: ['brown', 'red', 'white', 'black'],
    error: true
  },
]

const missingBandScenarios: Test[] = [
  {
    args: ['brown', 'black', 'red', 'none'],
  },
  {
    args: ['none', 'black', 'red', 'blue'],
    error: true
  },
  {
    args: ['orange', 'none', 'white', 'silver'],
    error: true
  },
  {
    args: ['orange', 'green', 'none', 'violet'],
    error: true
  },
  {
    args: ['none', 'none', 'none', 'violet'],
    error: true
  },
]

const executeTest = ({ args, error }: Test) => {
  if (error) {
    expect(() => getResult(...args)).toThrow(ValidationError)
  } else {
    const significant1 = colorsData[args[0]].significant as number
    const significant2 = colorsData[args[1]].significant as number
    const multiplier = colorsData[args[2]].multiplier as number
    expect(getResult(...args)).toBe(Number(`${significant1}${significant2}`) * multiplier)
  }
}

const addTestNameToScenarios = (scenarios: Test[]) => scenarios.map(scenario => ({
  testName: scenario.args.join(','),
  ...scenario
}))

const createTestGroup = (description: string, scenarios: Test[]) => {
  describe(
    description,
    () => it.each(addTestNameToScenarios(scenarios))('$testName', executeTest)
  )
}

createTestGroup('Resistors with all 4 bands', fourBandScenarios)
createTestGroup('Resistors with invalid band colors', invalidBandScenarios)
createTestGroup('Resistors with at least one missing band', missingBandScenarios)
