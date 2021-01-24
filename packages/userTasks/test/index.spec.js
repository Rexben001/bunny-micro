const request = require('supertest');
const app = require('../server');

beforeEach(() => {
  jest.setTimeout(10000);
});
describe('Index route', () => {
  test('should return 200', async (done, err) => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    done();
  });
});
