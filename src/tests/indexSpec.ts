import path from 'path'
import supertest from 'supertest'
import fs from 'fs'
import app from '..'

const request = supertest(app)
describe('Test endpoint responses', () => {
  it('gets the api endpoint status code', async () => {
    const response = await request.get(
      '/api/images?width=300&height=300&name=fjord'
    )
    expect(response.status).toBe(200)
  }),
    it('creates an image with the width and height requested', async () => {
      const [fileName, width, height] = ['fjord', 450, 300]
      await request.get(
        `/api/images?width=${width}&height=${height}&name=${fileName}`
      )
      expect(
        fs.existsSync(
          path.resolve(`./assets/thumb/${fileName}_${width}_${height}.jpg`)
        )
      ).toBeTruthy()
    })
})
