import {Router} from 'express'
import getDataController from '../../Controllers/getData.Controller'

const getData = Router()

getData.get('/getData', getDataController)

export default getData