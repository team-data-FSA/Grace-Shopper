/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Animal } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('User routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/animals/', () => {

    it('GET /api/animals', async () => {
      const res = await request(app)
        .get('/api/animals')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(100);
    })
  }) // end describe('/api/animal')
}) // end describe('Animal routes')
