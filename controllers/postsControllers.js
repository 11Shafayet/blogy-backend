const { ObjectId } = require('mongodb');

// CREATE NEW POST
const createPost = (postCollection) => async (req, res) => {
  const { userId, title, author, desc, pic } = req.body;

  if (!title || !author || !desc || !pic || !userId) {
    res.status(400).json({ message: 'All field is required!' });
  } else {
    const result = await postCollection.insertOne({
      userId,
      title,
      desc,
      author,
      pic,
    });

    res.status(200);
    res.json(result);
  }
};

// GET ALL POSTS OF A USER
const getUserPosts = (postCollection) => async (req, res) => {
  const { id } = req.params;
  if (id) {
    const result = await postCollection.find().toArray();

    res.status(200);
    res.json(result);
  } else {
    res.status(400).json({ message: 'Unauthorized User' });
  }
};

// GET SINGLE POST
const getSinglePost = (postCollection) => async (req, res) => {
  const { id } = req.params;

  if (id) {
    const result = await postCollection.findOne({
      _id: new ObjectId(id),
    });

    res.status(200);
    res.json(result);
  } else {
    res.status(400).json({ message: 'Unauthorized User' });
  }
};

// DELETE A POST OF A USER
const deleteUserPost = (postCollection) => async (req, res) => {
  const { postId } = req.params;

  if (postId) {
    const result = await postCollection.findOneAndDelete({
      _id: new ObjectId(postId),
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: 'No Post found to delete!' });
    }
  } else {
    res.status(400).json({ message: 'All field is required!' });
  }
};

// UPDATE A POST OF A USER
const updateUserPost = (postCollection) => async (req, res) => {
  const { postId } = req.params;
  const data = req.body;

  if (postId) {
    const result = await postCollection.findOneAndUpdate(
      {
        _id: new ObjectId(postId),
      },
      { $set: data },
      { returnDocument: 'after' } // This ensures that the returned result is the updated document
    );
    res.status(200);
    res.json(result);
  } else {
    res.status(400).json({ message: 'All field is required!' });
  }
};

module.exports = {
  createPost,
  getUserPosts,
  getSinglePost,
  deleteUserPost,
  updateUserPost,
};
