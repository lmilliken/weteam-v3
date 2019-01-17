const expect = require('expect');
const request = require('supertest');

const { app } = require('../../index');
const User = require('../../models/User');

// before((done) => {
//   User.deleteMany({}).then(() => done());
// });

describe('REGISTRATION ROUTES', () => {
  const user = {
    email: 'lau2rel.milliken@gmail.com',
    password: '123'
  };

  // describe('POST /register', () => {
  //   it('should create new user', (done) => {
  //     request(app)
  //       .post('/api/register')
  //       .send({ ...user })
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) {
  //           return done(err);
  //         }
  //         // done();
  //         User.find()
  //           .then((returnedUser) => {
  //             expect(returnedUser.length).toBe(1);
  //             expect(returnedUser[0].active).toBe(false);
  //             expect(returnedUser[0].activeFlags.verifiedEmailOrProvider).toBe(
  //               false
  //             );
  //             done();
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //             done(e);
  //           });
  //       });
  //   });

  //   it('should error out w/ duplicate email', (done) => {
  //     request(app)
  //       .post('/api/register')
  //       .send({ ...user })
  //       .expect(422)
  //       .end((err, res) => {
  //         if (err) {
  //           return done(err);
  //         }
  //         done();
  //       });
  //   });
  // });

  //const createdUser = await User.findOne({ email: user.email });

  describe('GET /api/emailverification/:emailToken', () => {
    it('activates user w/ valid token and redirects', (done) => {
      User.findOne({ email: user.email })
        .then((user) => {
          request(app)
            .get(`/api/emailverification/${user.emailVerificationToken}`)
            .expect(302) //302: Found, means that it was redirected correctly?
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              done();
            });
        })
        .catch((err) => done(err));
    });

    it('activated user correctly updated', (done) => {
      User.findOne({ email: user.email })
        .then((user) => {
          expect(user.active).toBe(false);
          expect(user.activeFlags.verifiedEmailOrProvider).toBe(true);
          done();
        })
        .catch((err) => done(err));
    });

    it('errors out on invalid token', (done) => {
      request(app)
        .get('/api/emailverification/dummyToken123')
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
