const express = require('express');
const router = express.Router();
const {
  createPost,
  getUserPosts,
  deleteUserPost,
  updateUserPost,
  getSinglePost,
} = require('../controllers/postsControllers');

module.exports = function (postCollection) {
  router.post('/', createPost(postCollection));
  router.get('/:id', getUserPosts(postCollection));
  router.get('/single/:id', getSinglePost(postCollection));
  router.delete('/:postId', deleteUserPost(postCollection));
  router.patch('/:postId', updateUserPost(postCollection));

  return router;
};
