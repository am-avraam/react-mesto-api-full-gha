require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET = 'vashe-mesto-vozle-backenda',
} = process.env;

module.exports = {
  NODE_ENV, JWT_SECRET,
};
