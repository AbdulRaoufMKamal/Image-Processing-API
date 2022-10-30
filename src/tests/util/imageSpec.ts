import path from 'path'
import fs from 'fs'
import Image from '../../util/image'

it('creates an image with requested width and height in the thumb directory', () => {
  const image: Image = new Image(300, 400, 'icelandwaterfall')
  image.resizeImage('550', '550', 'icelandwaterfall')
  const newImagePath = path.resolve(
    './assets/thumb/icelandwaterfall_450_550.jpg'
  )
  expect(fs.existsSync(newImagePath)).toBeTruthy()
})
