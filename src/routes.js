const handlers = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/images',
    handler: handlers.creates,
  },
  {
    method: 'GET',
    path: '/images',
    handler: handlers.getAll,
  },
  {
    method: 'GET',
    path: '/images/{id}',
    handler: handlers.getId,
  },
  {
    method: 'DELETE',
    path: '/images/{id}',
    handler: handlers.deletes,
  },
];

module.exports = routes;
