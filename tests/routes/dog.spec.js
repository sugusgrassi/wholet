/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');

const id = uuidv4();

const agent = session(app);
const dog = {
  id,
  name: 'Pug',
  weight: '10',
  height: '70',
  Image: "https://static.toiimg.com/thumb/msid-60132235,imgsize-169468,width-800,height-600,resizemode-75/60132235.jpg"
}; 
 
describe('Get Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)))
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

describe('GET /dogs', () => {
  it('should get 200', () =>
    agent.get('/dogs').expect(200)
  );
});

describe('GET /temperament', () => {
  it('should get 200', () =>
    agent.get('/temperament').expect(200)
  );
});