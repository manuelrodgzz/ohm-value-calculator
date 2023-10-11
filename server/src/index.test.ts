import { GroupedColors, ApiError, typeguard, colorsData, Color } from 'common'

describe('API endpoints', () => {

  beforeAll(async () => {
    // Wait some time before starting the tests to make sure db is up and running
    setTimeout(() => Promise.resolve(), 7000)
  })

  it('/colors endpoint returns colors grouped by significant, multiplier and tolerance percentage', async () => {
    const res = await fetch('http://server:3001/api/colors').then(r => r.json()) as GroupedColors | ApiError
    const allColorsArray: Color[] = Object.keys(colorsData) as Color[]
    const expectedResult: GroupedColors = {
      multiplier: allColorsArray.filter((color) => colorsData[color].multiplier !== undefined ) as Color[],
      significant: allColorsArray.filter((color) => colorsData[color].significant !== undefined ) as Color[],
      tolerancePercentage: allColorsArray.filter((color) => colorsData[color].tolerancePercentage !== undefined ) as Color[],
    }
    
    if (typeguard<ApiError>(res, 'error')) {
      throw new Error(res.error)
    }

    expect(Array.isArray(res.multiplier)).toBe(true)
    expect(Array.isArray(res.significant)).toBe(true)
    expect(Array.isArray(res.tolerancePercentage)).toBe(true)

    expectedResult.multiplier.forEach(color => expect(res.multiplier).toContain(color))
    expectedResult.significant.forEach(color => expect(res.significant).toContain(color))
    expectedResult.tolerancePercentage.forEach(color => expect(res.tolerancePercentage).toContain(color))
  })
})