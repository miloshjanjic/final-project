const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    if (!req.body.password || req.body.password != req.body.repeatPassword) {
      return res.status(400).send({
        error: true,
        message: 'Bad request. Passwords don`t match'
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
        error: true,
        message: 'This email already exists!'
      });
    }

    req.body.password = bcrypt.hashSync(req.body.password);
    req.body.repeatPassword = bcrypt.hashSync(req.body.repeatPassword);

    const newUser = await User.create(req.body);
    res.status(201).send({
      error: false,
      message: `User ${req.body.email} registered!`,
      newUser
    });
  } catch (error) {
    res.status(500).send(`Internal server error: ${error}`);
  }
};

const login = async (req, res) => {
  // const { email, password } = req.body
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({
        error: true,
        message: 'No user with such email',
        user,
      });
    }

    if (!bcrypt.compareSync( req.body.password , user.password)) {
      return res.status(401).send({
        error: true,
        message: 'Incorrect password'
      });
    }

    const payload = {
      id: user._id,
      email: user.email
    };

    const token = jwt.sign(payload, 'secret_key', {
      expiresIn: '180m'
    });

    res.send({
      error: false,
      message: 'JWT successfully generated',
      token: token,
      user
    });
  } catch (error) {
    res.status(500).send(`Internal server error: ${error}`);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).send({
      error: false,
      message: `All users are here:`,
      users
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const showOneUser = async (req, res) => {
  try {
    const { userId } = req.params.id;
    const user = await User.findById(userId);

    res.status(200).send({
      error: false,
      message: `User ${userId} is here`,
      user
    });
  } catch (error) {
    res.status(500).send(`Internal server error: ${error}`);
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send(`No user with id: ${userId}`);
    };

    const body = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true });

    res.status(200).send({
      error: false,
      message: `User ${userId} is updated!`,
      updatedUser
    });
  } catch (error) {
    res.status(500).send(`Internal server error: ${error}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).send({
      error: false,
      massage: `User ${userId} is deleted`,
      deletedUser
    });
  } catch (err) {
    res.status(500).send(`Internal server error: ${error}`);
  }
};

module.exports = {
  registerUser,
  login,
  getUsers,
  showOneUser,
  updateUser,
  deleteUser,
}