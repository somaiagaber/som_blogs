const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);

const User = require('../models/User');

const create = (user) => User.create(user);

const getAll = () => User.find({}).exec();

const getUser =(id) => User.findById(id).exec();

const editUser = (id, body) => User.findByIdAndUpdate(id, body, { new: true }).exec();

const pushfollowID = (id, body) => User.findByIdAndUpdate(id, body, { new: true }).exec();
const login = async ({ username, password }) => {
  // get user from DB
  const user = await User.findOne({ username }).exec();
  if (!user) {
    throw Error('UN_AUTHENTICATED');
  }
  //match input password with user data using bcrypt
  const isVaildPass = user.validatePassword(password);
  if (!isVaildPass) {
    throw Error('UN_AUTHENTICATED');
  }
  const token = await asyncSign({
    username: user.username,
    id: user.id,
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
  return { ...user.toJSON(), token };
  
  //return user;
};

const deleteone=(id) => User.findOneAndDelete(id).exec();
module.exports = {
  create,
  login,
  getAll,
  getUser,
  editUser,
  deleteone,
  pushfollowID
};
