import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

class Image {
  private _width: number | undefined
  private _height: number | undefined
  private _filePath: string | undefined

  constructor(width?: number, height?: number, filePath?: string) {
    this._width = width
    this._height = height
    this._filePath = filePath
  }

  get width(): number | undefined {
    return this._width
  }

  get height(): number | undefined {
    return this._height
  }

  get filePath(): string | undefined {
    return this._filePath
  }

  set width(width: number | undefined) {
    this._width = width
  }

  set height(height: number | undefined) {
    this._height = height
  }

  set filePath(filePath: string | undefined) {
    this._filePath = filePath
  }

  private isImageExist(path: string): boolean {
    if (fs.existsSync(path)) return true
    else return false
  }

  public async resizeImage(
    width: string,
    height: string,
    outPath: string
  ): Promise<void> {
    const imagePath: string = path.resolve(
      `./assets/thumb/${outPath}_${width}_${height}.jpg`
    )
    const originalImage = path.resolve(`./assets/full/${outPath}.jpg`)

    const widthNum: number = parseInt(width)
    const heightNum: number = parseInt(height)
    if (this.isImageExist(imagePath) || !this.isImageExist(originalImage))
      return
    await sharp(path.resolve(`./assets/full/${outPath}.jpg`))
      .resize({
        width: widthNum,
        height: heightNum,
      })
      .toFile(imagePath)
      .then(() => {
        while (!fs.existsSync(imagePath)) continue
      })
  }
}

export default Image
