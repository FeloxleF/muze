import vine from '@vinejs/vine'
import { SimpleMessagesProvider } from '@vinejs/vine'

/**
 * Validates the playlist's creation action
 */
export const createPlaylistValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(1)
      .maxLength(100)
      .escape(),
    description: vine
      .string()
      .maxLength(255)
      .escape()
      .optional(),
    userId: vine
      .number()
      .withoutDecimals()
      .positive(),
    songs: vine
        .array(vine.number().withoutDecimals().positive())
        .optional()
  })
)

createPlaylistValidator.messagesProvider = new SimpleMessagesProvider({
  'name.minLength': 'Name must contain at least 1 character',
  'name.maxLength': 'Name must contain 100 characters max',
  'description.maxLength': 'Description must contain 255 characters max',
  'userId.withoutDecimals': 'User ID must be an int number',
  'userId.positive': 'User ID must be an int number',
  'songs.array.withoutDecimals': 'Song IDs must be int numbers',
  'songs.array.positive': 'Song IDs must be positive numbers',
})
