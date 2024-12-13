import handlers from './handler.js';

export const routes = [
  // {
  //   method: 'POST',
  //   path: '/images',
  //   handler: handlers.creates,
  // },
  {
    method: 'GET',
    path: '/images',
    handler: handlers.getAll,
  },
  // {
  //   method: 'GET',
  //   path: '/images/{id}',
  //   handler: handlers.getId,
  // },
  // {
  //   method: 'DELETE',
  //   path: '/images/delete/{id}',
  //   handler: handlers.deletes,
  // },
];

export default routes
