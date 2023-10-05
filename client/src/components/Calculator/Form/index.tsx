import { Color, GroupedColors, Resistor, bandTypeMap } from 'common'
import { FC, FormEvent, useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import styled from '@emotion/styled'

const StyledForm = styled.form`
  padding: 2rem 0;
  max-width: 30rem;
  margin: 0 auto;

  & label {
    margin-right: 1rem;
  }
`

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
  isFetching?:boolean
  onChange: (band: keyof Resistor, color: Color) => void
  onSubmit: () => void
}

const ColorsDropdown: FC<ColorsDropdownProps> = ({ colorGroup, groupedColors, name, onChange, label, value }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Select id={name} onChange={(e) => onChange(name, e.target.value as Color)} value={value}>
        {
          groupedColors && groupedColors[colorGroup].map((color, i) => (
            <MenuItem key={`${name}-${i}`} value={ color }>{ color }</MenuItem>
          ))
        }
      </Select>
    </div>
  )
}

const Form: FC<FormProps> = ({resistor, onChange, onSubmit, isFetching }) => {
  const [groupedColors, setGroupedColors] = useState<GroupedColors>()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }

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
    <StyledForm onSubmit={handleSubmit}>
      <Grid container rowSpacing={2}>
        {
          Object.entries(resistor).map(([band, color], i) => (
            <Grid
              key={`dropdown-${band}-${i}`}
              item
              xs={6}
            >
              <ColorsDropdown
                name={ band as keyof typeof resistor}
                label={`Band ${band[band.length - 1]}`}
                onChange={onChange}
                groupedColors={groupedColors}
                value={color}
                colorGroup={bandTypeMap[band as keyof typeof resistor]}
              />
            </Grid>
          ))
        }
        <Grid item xs={12} display='flex' justifyContent='center'>
          <Button type='submit' variant='contained' disabled={isFetching}>Calculate</Button>
        </Grid>
      </Grid>
    </StyledForm>
  )
}

export default Form