import express, {Request, Response, Router} from 'express'
import fs from 'fs'
import path from 'path'
import Image from '../../util/image'

const resize: Router = express.Router()

resize.get('/', async (req: Request, res: Response) => {
  const isValidData: boolean =
    /^\d+$/.test(req.query.width as string) && /^\d+$/.test(req.query.height as string)
  if (!isValidData) {
    res.send('Invalid data entered')
    return
  }
  const image: Image = new Image()
  const promise: Promise<void> = image.resizeImage(
    req.query.width as string,
    req.query.height as string,
    req.query.name as string
  )
  promise.then(() => {
    const imagePath = path.resolve(
      `./assets/thumb/${req.query.name as string}_${req.query.width as string}_${
        req.query.height as string
      }.jpg`
    )
    if (fs.existsSync(imagePath))
      res.status(200).sendFile(path.resolve(imagePath))
    else res.send('Image was not found')
  })
})

export default resize
