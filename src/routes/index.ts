import express from 'express'
import resize from './api/resize'

const routes = express.Router()

routes.use('/images', resize)

export default routes
