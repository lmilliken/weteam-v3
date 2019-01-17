const assert = require('assert');
const expect = require('expect');

const sinon = require('sinon');

// const awesome = {
//   getIndexPage: (req, res) => {
//     res.send('Hey');
//   }
// };

// describe('test test', () => {
//   it('checks equality', () => {
//     var req = {};
//     var res = {
//       send: sinon.spy()
//     };

//     console.log(res.send);

//     // expect(res.send.firstCall.args[0]).to
//     awesome.getIndexPage(req, res);
//     expect(res.send.calledOnce).toBe(true);
//     expect(res.send.firstCall.args[0]).toEqual('blahHey');
//   });
// });

const myUser = {
  addUser: (name) => {
    this.name = name;
  }
};

describe('User', function() {
  describe('addUser', function() {
    it('should add a user', function() {
      sinon.spy(myUser, 'addUser');
      myUser.addUser('me');
      console.log('here: ', myUser);
      // expect(myUser.calledOnce).toBe(false);
    });
  });
});
