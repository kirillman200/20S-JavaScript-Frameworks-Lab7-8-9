const {  index, show, create, update, delete: _delete } = require('../controllers/BlogsController');

module.exports = router => {
  router.get('/blogs', index); // public
  router.get('/blogs/:id', show);
  router.post('/blogs', create);  // authenticated
  router.post('/blogs/update', update);  // authenticated
  router.post('/blogs/delete', _delete);  // authenticated
};