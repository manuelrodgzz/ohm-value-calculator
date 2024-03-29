import express, { Request, RequestHandler, Response } from 'express'
import ohmValueCalculator from '../utils/ohmValueCalculator'
import { ColorsData, COLORS_ARRAY, Resistor, OhmApiResponse, ApiError } from 'common'
import Db from '../utils/db'
import CustomError from '../utils/errors/custom'
import ValidationError from '../utils/errors/validation'

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
      return next()
    }
  }

  return res.status(400).json({error: 'Missing parameters or invalid parameter values.'})
}

router.get('/ohm', validateParams, async (req: Request<{}, {}, {}, Resistor>, res: Response<OhmApiResponse | ApiError>) => {
  const { bandA, bandB, bandC, bandD = 'none' } = req.query

  try {
    const colorCodes = await Db.getColorCodes(bandA, bandB, bandC, bandD)
    const colorsData: ColorsData = Object.fromEntries(
      colorCodes.map(
        ({color, _id, ...colorData}) => [color, colorData]
      )
    )

    const ohms = ohmValueCalculator(
      {
        bandA,
        bandB,
        bandC,
        bandD
      },
      colorsData
    )
    
    return res.json({
      ohms
    })
  } catch(error) {
    let message: string | null = null

    if (error instanceof CustomError) {
      message = error.message
    } else {
      console.error(error)
    }

    return res.status(error instanceof ValidationError ? 400 : 500).json({
      error: message || 'Unknown error.'
    })
  }
})

export default router