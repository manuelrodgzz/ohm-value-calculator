import { Color, GroupedColors, Resistor, bandTypeMap } from 'common'
import { FC, useEffect, useState } from 'react'

type ColorsDropdownProps = {
  colorGroup: keyof GroupedColors
  name: keyof Resistor
  onChange: (name: keyof Resistor, color: Color) => void
  label: string
  value: Color
  groupedColors?: GroupedColors
}

type FormProps = {
  resistor: Resistor
  onChange: (band: keyof Resistor, color: Color) => void
}

const ColorsDropdown: FC<ColorsDropdownProps> = ({ colorGroup, groupedColors, name, onChange, label, value }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} onChange={(e) => onChange(name, e.target.value as Color)} value={value}>
        {
          groupedColors && groupedColors[colorGroup].map((color, i) => (
            <option key={`${name}-${i}`} value={ color }>{ color }</option>
          ))
        }
      </select>
    </>
  )
}

const Form: FC<FormProps> = ({resistor, onChange }) => {
  const [groupedColors, setGroupedColors] = useState<GroupedColors>()

  useEffect(() => {
    const getGroupedColors = async ( ) => {
      try {
        const data = await fetch('http://localhost:3001/api/colors').then(r => r.json()) as GroupedColors
        setGroupedColors(data)
      } catch(e) {
        console.error(e)
      }
    }

    getGroupedColors()
  }, [])

  return (
    <form>
      {
        Object.entries(resistor).map(([band, color], i) => (
          <ColorsDropdown
            key={`dropdown-${band}-${i}`}
            name={ band as keyof typeof resistor}
            label={`Band ${band[band.length - 1]}`}
            onChange={onChange}
            groupedColors={groupedColors}
            value={color}
            colorGroup={bandTypeMap[band as keyof typeof resistor]}
          />
        ))
      }

      <button>Calculate</button>
    </form>
  )
}

export default Form