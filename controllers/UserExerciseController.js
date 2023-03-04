const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const url = require('url');
const User = require("../models/User");
const Exercise = require("../models/Exercise");
const { filterLogs, validateDate, sendErrorResponse } = require("../utils/utils");
const ERRORS = require("../constants/constants");

class UserExerciseController {
  async create(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        sendErrorResponse(res, 400, ERRORS.USER_NOT_FOUND);
      }

      const user = await User.findById(id);

      if (!user) {
        sendErrorResponse(res, 400, ERRORS.USER_NOT_FOUND);
      }

      const { duration, description, date = `${format(new Date(), `yyy-MM-dd`)}` } = req.body;

      if (!duration || typeof duration !== 'number') {
        sendErrorResponse(res, 400, ERRORS.DURATION_IS_REQUIRED);
      } else if (!description || typeof description !== 'string') {
        sendErrorResponse(res, 400, ERRORS.DESCRIPTION_IS_REQUIRED);
      } else if (!validateDate(date)) {
        sendErrorResponse(res, 400, ERRORS.WRONG_FORMAT);
      }

      const response = await Exercise.create({
        userId: id,
        exerciseId: uuid(),
        duration,
        description,
        date,
        username: user.username
      });

      return res.status(200).json(response);
    } catch (err) {
      sendErrorResponse(res, 500, err.message);
    }
  }

  async getLogs(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        sendErrorResponse(res, 400, ERRORS.USER_NOT_FOUND);
      }
      const user = await User.findById(id);

      if (!user) {
        sendErrorResponse(res, 400, ERRORS.USER_NOT_FOUND);
      }

      const exercises = await Exercise.find({ userId: id }) || [];
      const { from, to, limit } = url.parse(req.url, true).query;

      const filteredLogs = filterLogs( exercises, from, to, Number(limit) );
      const response = {
        _id: user._id,
        username: user.username,
        logs: filteredLogs,
        count: filteredLogs.length
      };

      return res.status(200).json(response);
    } catch (err) {
      sendErrorResponse(res, 500, err.message);
    }
  }
}

module.exports = new UserExerciseController();