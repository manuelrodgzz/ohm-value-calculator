const colorsData: AllColorsData = {
  black: {
  	significant: 0,
    multiplier: 1
  },
  brown: {
  	significant: 1,
    multiplier: 10,
    tolerancePercentage: 0.01
  },
  red: {
  	significant: 2,
    multiplier: 100,
    tolerancePercentage: 0.02
  },
  orange: {
  	significant: 3,
    multiplier: 1000,
    tolerancePercentage: 0.0005
  },
  yellow: {
  	significant: 4,
    tolerancePercentage: 0.0002,
    multiplier: 10_000
  },
  green: {
  	significant: 5,
    multiplier: 100_000,
    tolerancePercentage: 0.005
  },
  blue: {
  	significant: 6,
    multiplier: 1_000_000,
    tolerancePercentage: 0.0025
  },
  violet: {
  	significant: 7,
    multiplier: 10_000_000,
    tolerancePercentage: 0.001
  },
  grey: {
  	significant: 8,
    multiplier: 100_000_000,
    tolerancePercentage: 0.0001
  },
  white: {
  	significant: 9,
    multiplier: 1_000_000_000
  },
  gold: {
  	multiplier: 	0.1,
    tolerancePercentage: 0.05
  },
  silver: {
  	multiplier: 	0.01,
    tolerancePercentage: 0.1
  },
  pink: {
    multiplier: 0.001
  },
  none: {
    tolerancePercentage: 0.2
  }
}

export default colorsData