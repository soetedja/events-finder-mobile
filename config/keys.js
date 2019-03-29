const keysDev = require('./keys.dev.js');
const keysProd = require('./keys.prod');

if (__DEV__) {
  module.exports = keysDev;
} else {
  module.exports = keysProd;
}
