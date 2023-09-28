type Color = 'black'
| 'brown'
| 'red'
| 'orange'
| 'yellow'
| 'green'
| 'blue'
| 'violet'
| 'grey'
| 'white'
| 'gold'
| 'silver'
| 'pink'
| 'none'

type Resistor = {
  bandA: Color
  bandB: Color
  bandC: Color
  bandD?: Color
}

type Band = {
  significant?: number
  multiplier?: number
  tolerancePercentage?: number
}

type AllColorsData = Record<Color, Band>