const config = require('../../config/config');

module.exports = (emailToken) => {
  return `
  <html>
  <body>
    <div style="text-align: center">
      <h3>I'd like your input!</h3>
      <p>Please answer the following question:</p>
      <p>Please activate your account</p>
      <div>
        <a href="${
          config.redirectDomain
        }/api/emailverification/${emailToken}/yes"><button>Activate</button></a>
      </div>
    </div>
  </body>
</html>
  `;
};
