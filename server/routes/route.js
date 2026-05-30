import express from 'express'
import { drivers } from '../controllers/drivers.js'
import { raceSchedule } from '../controllers/raceSchedule.js'
import { standings } from '../controllers/standings.js'
import { constructionstandings } from '../controllers/constructors.js'
import { raceWinner } from '../controllers/raceWinners.js'
import { driverdetail } from '../controllers/driverDetail.js'
import { driverPosition } from '../controllers/driverPos.js'

const routes = express.Router()

routes.get('/drivers',drivers)
routes.get('/constructorstandings',constructionstandings)
routes.get('/schedule',raceSchedule)
routes.get('/standings',standings)
routes.get('/racewinner/:year',raceWinner)
routes.get('/driverdetail/:year/:teamId',driverdetail)
routes.get('/driverposition/:year',driverPosition)


export default routes