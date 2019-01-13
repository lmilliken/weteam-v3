const expect = require('expect');
const request = require('supertest');

const { app } = require('../../index');
const User = require('../../models/User');

beforeEach((done) => {
  User.deleteMany({}).then(() => done());
});

describe('POST /register', () => {
  it('should create new user', (done) => {
    var user = {
      email: 'laurel.milliken@gmail.com',
      password: '123'
    };

    request(app)
      .post('/api/register')
      .send({ ...user })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.find({ email: user.email })
          .then((user) => {
            expect(user.length).toBe(1);
            done();
          })
          .catch((e) => done(e));
      });
  });

  it('should error out w/ duplicate email', (done) => {
    var user = {
      email: 'laurel.milliken@gmail.com',
      password: '123'
    };

    request(app)
      .post('/api/register')
      .send({ ...user })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.find({ email: user.email })
          .then((user) => {
            expect(user.length).toBe(1);
            done();
          })
          .catch((e) => done(e));
      });
  });
});
