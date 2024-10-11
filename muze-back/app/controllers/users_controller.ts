import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class UsersController {
  public async index({ response }: HttpContext) {
    const users = await User.all()
    return response.send(users)
  }

  public async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.status(404).send('user not found')
    logger.info(`show user: ${user.username}`)
    return response.send(user)
  }

  public async showbyUsername({ request, response }: HttpContext) {
    const data = request.only(['username'])
    await createUserValidator.validate(data)
    let user = await User.findBy('username', data.username)
    if (!user) {
      user = await User.create(data)
      logger.info(`created user ${data.username}`)
    }
    logger.info(`show user: ${user.username}`)
    return response.send(user)
  }
  

  public async store({ request, response }: HttpContext) {
    const data = request.only(['username'])
    await createUserValidator.validate(data)
    if (await User.findBy('username', data.username)) {
      return response.status(400).send({ messages: 'Username already exist' })
    }
    const user = await User.create(data)
    logger.info(`User created: ${user.username}`)
    return response.status(201).send(user)
  }

  public async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.status(404).send({ messages: 'User not found' })
    const data = request.only(['username'])
    await createUserValidator.validate(data)
    if (await User.findBy('username', data.username)) {
      return response.status(400).send({ messages: 'Username already exist' })
    }
    user.merge(data)
    await user.save()
    logger.info(`User updated: ${user.username}`)
    return response.send(user)
  }

  public async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.status(404).send({ messages: 'User not found' })
    await user.delete()
    logger.info(`User deleted: ${user.username}`)
    return response.status(201).send({ messages: 'User deleted' })
  }
}
