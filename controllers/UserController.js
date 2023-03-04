const User = require("../models/User");
const { sendErrorResponse } = require("../utils/utils");
const errors = require("../constants/constants");

class UserController {
  async create(req, res) {
    try {
      const { username } = req.body;
      if (!username || username.trim().length === 0) {
        sendErrorResponse(res, 400, errors.USERNAME_IS_REQUIRED);
      }

      const duplicate = await User.findOne({ username }).exec();
      if (duplicate) {
        sendErrorResponse(res, 409, errors.USERNAME_EXIST);
      }

      const user = await User.create({ username });

      return res.status(200).json(user);
    } catch (err) {
      sendErrorResponse(res, 500, err.message);
    }
  }

  async getAll(req, res) {
    try {
      const users = await User.find();

      return res.status(200).json(users);
    } catch (err) {
      sendErrorResponse(res, 500, err.message);
    }
  }

  async getSingle(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        sendErrorResponse(res, 404, errors.USER_NOT_FOUND);
      }

      const user = await User.findById(id);

      return res.status(200).json(user);
    } catch (err) {
      sendErrorResponse(res, 500, err.message);
    }
  }

  async update(req, res) {
    try {
      const { user } = req.body;
      if (!user._id) {
        sendErrorResponse(res, 404, errors.USER_NOT_FOUND);
      }

      const updatedUser = await User.findById(user._id, user, { new: true });

      return res.status(200).json(updatedUser);
    } catch (err) {
      sendErrorResponse(res, 500, err.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        sendErrorResponse(res, 404, errors.USER_NOT_FOUND);
      }

      const user = await User.findByIdAndDelete(id);

      return res.status(200).json(user);
    } catch (err) {
      sendErrorResponse(res, 500, err.message);
    }
  }
}

module.exports = new UserController();