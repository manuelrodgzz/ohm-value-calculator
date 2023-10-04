import { FC } from 'react'
import styles from './styles.module.css'
import { Color } from 'common'

type BandProps = {
  onBandChange: (index: number) => void
  index: number
  color?: Color
}

type ResistorProps = {
  onBandChange: Pick<BandProps, 'onBandChange'>['onBandChange']
  bands: Color[]
}

const Band: FC<BandProps> = ({ onBandChange, color = 'none', index }) => (
  <button
    style={{backgroundColor: color === 'none' ? 'transparent' : color}}
    className={styles.band}
  />
)

const Resistor: FC<ResistorProps> = ({ bands, onBandChange }) => {

  return (
    <div className={styles.container}>
      <div className={styles.resistor}>
        {
          bands.map((band, i) => <Band key={`band-${i}`} onBandChange={onBandChange} index={i} color={ band }/>)
        }
      </div>
    </div>
  )
}

export default Resistor