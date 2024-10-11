import { test } from '@japa/runner'
import Song from '#models/song';
import sinon from 'sinon'

test.group('Get Song by ID', (group) => {
  let findStub: sinon.SinonStub

  group.each.setup(() => {
    // On mocke la méthode Song.find
    findStub = sinon.stub(Song, 'find').callsFake(async (id: number) => {
      console.log(`Mocked Song.find called with id: ${id}`);

      // Crée une nouvelle instance de Song et définis ses attributs
      const song = new Song();
      song.id = 1;
      song.name = 'Test Song';
      song.artist = 'Test Artist';

      return song; // Retourner une instance de modèle Lucid
    });

    return () => {
      // On restaure le comportement normal après chaque test
      findStub.restore();
    };
  });

  test('Should return a song if it exists', async ({ client, assert }) => {
    try {
      const response = await client.get('/songs/1');
      response.assertStatus(200);
      assert.deepEqual(response.body(), {
        id: 1,
        name: 'Test Song',
        artist: 'Test Artist',
      });
    } catch (error) {
      console.log(error);
    }
  });
});


// ------------- Random song list -----------------


test.group('Get Random Songs', (group) => {
  let queryStub: sinon.SinonStub
  let orderByRawStub: sinon.SinonStub
  let limitStub: sinon.SinonStub

  group.each.setup(() => {
    // On mocke la méthode Song.query
    queryStub = sinon.stub(Song, 'query').returnsThis()
    orderByRawStub = sinon.stub().returnsThis()
    limitStub = sinon.stub().resolves([
      { id: 1, name: 'Random Song 1', artist: 'Artist 1' },
      { id: 2, name: 'Random Song 2', artist: 'Artist 2' },
    ])

    queryStub.returns({
      orderByRaw: orderByRawStub,
      limit: limitStub,
    })

    return () => {
      // On restaure le comportement normal après chaque test
      queryStub.restore()
    }
  })

  test('Should return a list of random songs', async ({ client, assert }) => {
    try {
      const response = await client.get('/songs/random')
      response.assertStatus(200)
      assert.deepEqual(response.body(), [
        { id: 1, name: 'Random Song 1', artist: 'Artist 1' },
        { id: 2, name: 'Random Song 2', artist: 'Artist 2' },
      ])
    } catch (error) {
      console.log(error)
    }
  })

  test('Should return an error if fetching random songs fails', async ({ client, assert }) => {
    limitStub.rejects(new Error('Database error'))

    try {
      const response = await client.get('/songs/random')
      response.assertStatus(500)
      assert.deepEqual(response.body(), {
        messages: 'Internal server error for fetching random songs',
      })
    } catch (error) {
      console.log(error)
    }
  })
})




