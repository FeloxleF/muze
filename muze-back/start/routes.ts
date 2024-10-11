/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import Song from '#models/song'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
const PlaylistsController = () => import('#controllers/playlists_controller')
const UsersController = () => import('#controllers/users_controller')
const SongsController = () => import('#controllers/songs_controller')

// ------------- swagger for api docs ----------------------------

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})

// -------------- swagger end -----------------------------------

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/song', async ({ response }) => {
  const songs = await Song.all()
  response.send(songs)
})

// CRUD Users
router
  .group(() => {
    router.get('/', [UsersController, 'index'])
    router.post('/username',[UsersController, 'showbyUsername'])
    router.get('/:id', [UsersController, 'show'])
    router.get('/:id/playlists', [PlaylistsController, 'userIndex'])
    router.post('/', [UsersController, 'store'])
    router.put('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'destroy'])
  })
  .prefix('/users')

// CRUD playlists
router
  .group(() => {
    router.get('/', [PlaylistsController, 'index'])
    router.get('/:id', [PlaylistsController, 'show'])
    router.post('/', [PlaylistsController, 'store'])
    router.put('/:id', [PlaylistsController, 'update'])
    router.delete('/:id', [PlaylistsController, 'destroy'])
    router.put('/:playlistId/songs/:songId', [PlaylistsController, 'addSongToPlaylist'])
    router.delete('/:playlistId/songs/:songId', [PlaylistsController, 'removeSongFromPlaylist'])
  })
  .prefix('/playlists')

router
  .group(() => {
    router.get('/list', [SongsController, 'getRandomSongs'])
    router.get('/:id', [SongsController, 'getSongById'])
  })
  .prefix('/songs')
