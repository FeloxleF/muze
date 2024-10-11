import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Playlist from './playlist.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Song extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare artist: string

  @column()
  declare style: string

  @manyToMany(() => Playlist, {
    pivotTable: 'playlist_songs',
    pivotTimestamps: true,
    pivotForeignKey: 'id_song',
    pivotRelatedForeignKey: 'id_playlist'
  })
  declare playlist: ManyToMany<typeof Playlist>

  @column.dateTime()
  declare duration: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
