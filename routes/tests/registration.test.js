const expect = require('expect');
const request = require('supertest');

const { app } = require('../../index');
const User = require('../../models/User');

before((done) => {
  User.deleteMany({}).then(() => done());
});

describe('REGISTRATION ROUTES', () => {
  const user = {
    email: 'laurel.milliken@gmail.com',
    password: '123'
  };
  describe('POST /register', () => {
    it('should create new user', (done) => {
      request(app)
        .post('/api/register')
        .send({ ...user })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          // done();
          User.find()
            .then((returnedUser) => {
              expect(returnedUser.length).toBe(1);
              done();
            })
            .catch((e) => {
              console.log(e);
              done(e);
            });
        });
    });

    it('new user should not be active', async () => {
      const createdUser = await User.findOne({ email: user.email });
      expect(createdUser.active).toBe(false);
      expect(createdUser.activeFlags.verifiedEmailOrProvider).toBe(false);
    });

    it('should error out w/ duplicate email', (done) => {
      request(app)
        .post('/api/register')
        .send({ ...user })
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /api/emailverification/:emailToken', async () => {
    const token = await User.findOne({ email: user.email }).then(
      (user) => user.emailVerificationToken
    );

    it('verify user email w/ token', (done) => {
      request(app)
        .get(`api/emailverification/${token}`)
        .expect(200)
        .end((err, res) => {
          done();
        });
    });
  });
});
