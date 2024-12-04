const {
  creates,
  getAll,
  getId,
  deletes,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/images',
    handler: creates,
  },
  {
    method: 'GET',
    path: '/images',
    handler: getAll,
  },
  {
    method: 'GET',
    path: '/images/{id}',
    handler: getId,
  },
  {
    method: 'DELETE',
    path: '/images/{id}',
    handler: deletes,
  },
];

module.exports = routes;