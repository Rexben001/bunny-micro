const request = require('supertest');
const app = require('../server');

let userId = '';
let userId2 = '';

describe('Get all users route', () => {
  it(
    'should return 200',
    async (done, err) => {
      try {
        const res = await request(app).get('/api/v1/users/all');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        userId = res.body.result[0]._id;
        // userId2 = res.body.result[1]._id;
        expect(res.body.message).toEqual('users fetched successfully');
        done();
      } catch (error) {
        console.log(error);
      }
    },
    5000
  );
});

describe('Get all users route', () => {
  it(
    'should return 200',
    async (done, err) => {
      try {
        const res = await request(app).get(`/api/v1/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('user fetched successfully');
        done();
      } catch (error) {
        console.log(error);
      }
    },
    5000
  );
});

describe('Update users route', () => {
  it(
    'should return 200',
    async (done, err) => {
      try {
        const res = await request(app).put(`/api/v1/users/${userId}`).send({
          name: 'Allen John',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('user updated successfully');
        done();
      } catch (error) {
        console.log(error);
      }
    },
    5000
  );
});

describe('Add new user route', () => {
  it(
    'should return 201',
    async (done, err) => {
      try {
        const res = await request(app).post(`/api/v1/users/create`).send({
          name: 'Allen Johnson',
        });
        userId2 = res.body.result._id;
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('user created successfully');
        done();
      } catch (error) {
        console.log(error);
      }
    },
    5000
  );
});

describe('Delete a user route', () => {
  it(
    'should return 204',
    async (done, err) => {
      try {
        const res = await request(app).delete(`/api/v1/users/${userId2}`);
        expect(res.statusCode).toEqual(204);
        done();
      } catch (error) {
        console.log(error);
      }
    },
    5000
  );
});
