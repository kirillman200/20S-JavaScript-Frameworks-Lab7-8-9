const Blog = require('../models/blog');
const User = require('../models/user');

const getUser = async req => {
  const { user: email } = req.session.passport;
  return await User.findOne({email: email});
}

exports.index = async (req, res) => {
  try {
    const user = await getUser(req);

    const blogs = await Blog
      .find({user: user._id})
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({status: 'failed', message: `There was an error in retrieving the blogs.`, error});
  }
};

exports.show = async (req, res) => {
  try {
    const user = await getUser(req);

    const blog = await Blog
      .findOne({user: user._id, _id: req.params.id})
      .populate('user');

    if (!blog) throw new Error('Blog could not be found');

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({status: 'failed', message: `There was an error in retrieving the blog.`, error});
  }
};


exports.create = async (req, res) => {

  try {
    const user = await getUser(req);
    
    const blog = await Blog.create({user: user._id, ...req.body});

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({status: 'failed', message: `There was an error in creating the blog.`, error});
  }
};

exports.update = async (req, res) => {
  try {
    const user = await getUser(req);
    let blog = await Blog
    .findOne({user: user._id, _id: req.body.id});
    if (!blog) throw new Error('Blog could not be found');
    const attributes = {user: user._id, ...req.body};
    await Blog.validate(attributes);
    await Blog.updateOne({_id: req.body.id, user: user._id}, {...req.body});

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in updating the tour.`, error});
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await getUser(req);
    let blog = await Blog
    .findOne({user: user._id, _id: req.body.id});
    if (!blog) throw new Error('Blog could not be found');
    await Blog.deleteOne({_id: req.body.id, user: user._id});
    res.status(200).json({message: 'Blog was deleted successfully'});
  } catch (error) {
    res.status(400).json({status: 'failed', message: `There was an error in deleting the Blog.`, error});
  }
};