// import type { HttpContext } from '@adonisjs/core/http'

import Song from '#models/song'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class SongsController {
  public async getRandomSongs({ response }: HttpContext) {
    try {
      const randomSongs = await Song.query().orderByRaw('RANDOM()').limit(20)

      return response.send(randomSongs)
    } catch (error) {
      logger.error('Error fetching random songs:', error)
      return response
        .status(500)
        .send({ messages: 'Internal server error for fetching random songs' })
    }
  }

  public async getSongById({ params, response }: HttpContext) {
    try {
      const song = await Song.find(params.id)
      if (!song) {
        return response.status(404).send({ messages: 'Song not found' })
      }

      return response.send(song)
    } catch (error) {
      logger.error('Error fetching song:', error)
      return response.status(500).send({ messages: 'Internal server error' })
    }
  }
}
