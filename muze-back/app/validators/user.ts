import vine, { SimpleMessagesProvider } from '@vinejs/vine'

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(1)
      .maxLength(30)
      .escape()
      .regex(/^[a-zA-Z0-9_-]+$/),
  })
)

createUserValidator.messagesProvider = new SimpleMessagesProvider({
  'username.minLength': 'username must contain at least 1 characters',
  'username.maxLength': 'username must contain 30 characters max',
  'username.regex': 'The username can only contain letters, underscores and hyphens.',
})
