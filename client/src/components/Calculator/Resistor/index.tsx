import { FC } from 'react'
import styles from './styles.module.css'
import { Color, Resistor as ResistorType } from 'common'

type BandProps = {
  color?: Color
}

type ResistorProps = ResistorType

const Band: FC<BandProps> = ({color = 'none'}) => (
  <div
    style={{backgroundColor: color === 'none' ? 'transparent' : color}}
    className={styles.band}
  />
)

const Resistor: FC<ResistorProps> = ({ bandA, bandB, bandC, bandD }) => {

  return (
    <div className={styles.container}>
      <div className={styles.resistor}>
        <Band color={ bandA }/>
        <Band color={ bandB }/>
        <Band color={ bandC }/>
        <Band color={ bandD }/>
      </div>
    </div>
  )
}

export default Resistor