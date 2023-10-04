import express, { Response } from 'express'
import Db from '../utils/db'
import { ApiError, GroupedColors } from 'common'
import CustomError from '../utils/errors/custom'

const router = express.Router()

router.get('/colors', async (req,res: Response<GroupedColors | ApiError>) => {
  try {
    const colorCodes = await Db.getColorCodes()
    const groupedColors: GroupedColors = {
      significant: [],
      multiplier: [],
      tolerancePercentage: []
    }

    colorCodes.forEach(({ color, multiplier, significant, tolerancePercentage }) => {
      if (multiplier) {
        groupedColors.multiplier.push(color) 
      }

      if (significant) {
        groupedColors.significant.push(color)
      }

      if (tolerancePercentage) {
        groupedColors.tolerancePercentage.push(color)
      }
    })

    return res.json(groupedColors)
  } catch (e) {
    let message: string | null = ''

    if (e instanceof CustomError) {
      message = e.message
    } else {
      console.error(e)
    }

    return res.status(500).json({
      error: message || 'Unknown error.'
    })
  }
})

export default router