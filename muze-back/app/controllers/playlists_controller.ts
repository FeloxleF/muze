import Playlist from '#models/playlist'
import Song from '#models/song'
import User from '#models/user'
import { createPlaylistValidator } from '#validators/playlist'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class PlaylistsController {
  public async index({ response }: HttpContext) {
    const playlists = await Playlist.query().preload('user').preload('song')
    return response.send(playlists)
  }

  public async userIndex({ params, response }: HttpContext) {
    const userId = params.id
    const user = await User.find(params.id)
    if (!user) return response.status(404).send({ messages: 'User not found' })

    const playlists = await Playlist.query().where('userId', userId).preload('user')
    logger.info(`sending playlist list of user : ${user.username}`)
    return response.send(playlists)
  }

  public async show({ params, response }: HttpContext) {
    const playlist = await Playlist.query()
      .where('id', params.id)
      .preload('user')
      .preload('song')
      .first()
    if (!playlist) {
      return response.status(404).send('Playlist not found')
    }
    logger.info(`Show playlist: ${playlist.name}`)
    return response.send(playlist)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'userId', 'songs'])
    await createPlaylistValidator.validate(data)

    const user = await User.find(data.userId)
    if (!user) return response.status(404).send({ messages: 'User not found' })

    const playlist = await Playlist.create({
      name: data.name,
      description: data.description,
      userId: data.userId,
    })
    if (data.songs && data.songs.length > 0) {
      await playlist.related('song').attach(data.songs)
    }
    logger.info(`Playlist created: ${playlist.name}`)
    return response.status(201).send(playlist)
  }

  public async update({ params, request, response }: HttpContext) {
    const playlist = await Playlist.find(params.id)
    if (!playlist) {
      return response.status(404).send('Playlist not found')
    }
    const data = request.only(['name', 'description', 'songs'])
    // await createPlaylistValidator.validate(data)
    playlist.merge({ name: data.name, description: data.description })
    await playlist.save()

    if (data.songs && data.songs.length > 0) {
      await playlist.related('song').sync(data.songs)
    }
    logger.info(`Playlist updated: ${playlist.name}`)
    const playlistWithSong = await Playlist.query().where('id', params.id).preload('song')
    return response.send(playlistWithSong)
  }

  public async destroy({ params, response }: HttpContext) {
    const playlist = await Playlist.find(params.id)
    if (!playlist) {
      return response.status(404).send('Playlist not found')
    }
    await playlist.related('song').detach()
    await playlist.delete()
    logger.info(`Playlist deleted: ${playlist.name}`)
    return response.status(200).send({ messages: 'Playlist deleted' })
  }

  // Gerer les sons au sein d'une playlist

  public async addSongToPlaylist({ params, response }: HttpContext) {
    try {
      const playlist = await Playlist.find(params.playlistId)
      if (!playlist) {
        return response.status(404).send({ messages: 'Playlist not found' })
      }

      const song = await Song.find(params.songId)
      if (!song) {
        return response.status(404).send({ messages: 'Song not found' })
      }

      await playlist.related('song').attach([song.id])
      logger.info(`Song added to playlist: ${song.name} to ${playlist.name}`)
      return response.status(200).send({ messages: 'Song added to playlist' })
    } catch (error) {
      logger.error('Error adding song to playlist:', error)
      return response.status(500).send({ messages: 'Internal server error' })
    }
  }

  public async removeSongFromPlaylist({ params, response }: HttpContext) {
    try {
      const playlist = await Playlist.find(params.playlistId)
      if (!playlist) {
        return response.status(404).send({ messages: 'Playlist not found' })
      }

      const song = await Song.find(params.songId)
      if (!song) {
        return response.status(404).send({ messages: 'Song not found' })
      }

      await playlist.related('song').detach([song.id])
      logger.info(`Song removed from playlist: ${song.name} from ${playlist.name}`)
      return response.status(200).send({ messages: 'Song removed from playlist' })
    } catch (error) {
      logger.error('Error removing song from playlist:', error)
      return response.status(500).send({ messages: 'Internal server error' })
    }
  }
}
