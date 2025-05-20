const { faker } = require('@faker-js/faker');

function generateUsers(userContext, events, done) {
  const email = faker.internet.email();
  const password = faker.internet.password(8);
  userContext.vars.email = email;
  userContext.vars.password = password;
  return done();
}

module.exports = {
  generateUsers
};