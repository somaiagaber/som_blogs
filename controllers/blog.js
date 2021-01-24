const Blog = require('../models/Blog');

const create = (blog) => Blog.create(blog);

const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();

const getAll = () => Blog.find({}).exec();

const getuserBlogs = (query) => Blog.find(query).exec();

const getById = (id) => Blog.findById(id).exec();

const deleteone=(id) => Blog.findOneAndDelete({'_id':id}); 

const getblog=(_tag) =>Blog.find({tags:{$elemMatch:{tag:_tag}}}).exec();

module.exports = {
  create,
  editOne,
   getAll,
   getById,
   getuserBlogs,
  deleteone,
  getblog
};
