import express, { Request, RequestHandler } from 'express'
import colorsData from '../mocks/colorsData'
import ohmValueCalculator from '../utils/ohmValueCalculator'
import { COLORS_ARRAY, Resistor } from '../types'
import ValidationError from '../utils/validationError'

const router = express.Router()

type Query = {
  bandA?: string
  bandB?: string
  bandC?: string
  bandD?: string
}

const validateParams: RequestHandler<{}, {}, {}, Query> = (req, res, next) => {
  const { bandA, bandB, bandC, bandD } = req.query

  // If bands A, B and C are valid colors
  if ([bandA, bandB, bandC].every(color => COLORS_ARRAY.includes(color as any))) {
    // And D was omitted OR is a valid color
    if (bandD === undefined || COLORS_ARRAY.includes(bandD as any)) {
      next()
    }
  }

  res.status(400).json({error: 'Missing parameters or invalid parameter values.'})
}

router.get('/ohm', validateParams, (req: Request<{}, {}, {}, Resistor>, res) => {
  const { bandA, bandB, bandC, bandD = 'none' } = req.query

  try {
    const ohms = ohmValueCalculator(
      {
        bandA,
        bandB,
        bandC,
        bandD
      },
      colorsData
    )
    
    res.json({
      ohms
    })
  } catch(error) {
    let message: string | null = null

    if (error instanceof ValidationError) {
      message = error.message
    }

    res.status(message ? 400 : 500).json({
      error: message || 'Unknown error.'
    })
  }
})

export default router