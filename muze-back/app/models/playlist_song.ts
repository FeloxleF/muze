import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class PlaylistSong extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare idSong: number

  @column()
  declare idPlaylist: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
