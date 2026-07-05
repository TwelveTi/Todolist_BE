const AppError = require("../utils/AppError");

const TASK_FIELDS = ["title", "description", "status", "taskDate"];
const TASK_TITLE_MAX_LENGTH = 120;
const TASK_DESCRIPTION_MAX_LENGTH = 500;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isPositiveInteger(value) {
  const numberValue = Number(value);

  return Number.isInteger(numberValue) && numberValue > 0;
}

function isValidDateOnly(value) {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function pickTaskFields(taskData) {
  return TASK_FIELDS.reduce((payload, field) => {
    if (Object.prototype.hasOwnProperty.call(taskData, field)) {
      payload[field] = taskData[field];
    }

    return payload;
  }, {});
}

function validateTaskPayload(taskData, { partial = false } = {}) {
  const payload = pickTaskFields(taskData || {});
  const hasPayload = Object.keys(payload).length > 0;

  if (partial && !hasPayload) {
    throw new AppError("At least one task field is required", 400);
  }

  if (!partial && typeof payload.title === "undefined") {
    throw new AppError("Title is required", 400);
  }

  if (!partial && typeof payload.description === "undefined") {
    throw new AppError("Description is required", 400);
  }

  if (!partial && typeof payload.taskDate === "undefined") {
    throw new AppError("Task date is required", 400);
  }

  if (typeof payload.title !== "undefined") {
    if (typeof payload.title !== "string" || !payload.title.trim()) {
      throw new AppError("Title must be a non-empty string", 400);
    }

    payload.title = payload.title.trim();

    if (payload.title.length > TASK_TITLE_MAX_LENGTH) {
      throw new AppError(
        `Title must not exceed ${TASK_TITLE_MAX_LENGTH} characters`,
        400
      );
    }
  }

  if (typeof payload.description !== "undefined") {
    if (typeof payload.description !== "string") {
      throw new AppError("Description must be a string", 400);
    }

    payload.description = payload.description.trim();

    if (!payload.description) {
      throw new AppError("Description must be a non-empty string", 400);
    }

    if (payload.description.length > TASK_DESCRIPTION_MAX_LENGTH) {
      throw new AppError(
        `Description must not exceed ${TASK_DESCRIPTION_MAX_LENGTH} characters`,
        400
      );
    }
  }

  if (
    typeof payload.status !== "undefined" &&
    typeof payload.status !== "boolean"
  ) {
    throw new AppError("Status must be a boolean", 400);
  }

  if (
    typeof payload.taskDate !== "undefined" &&
    !isValidDateOnly(payload.taskDate)
  ) {
    throw new AppError("Task date must use YYYY-MM-DD format", 400);
  }

  return payload;
}

function validateTaskId(req, res, next) {
  if (!isPositiveInteger(req.params.id)) {
    return next(new AppError("Task id must be a positive integer", 400));
  }

  return next();
}

function validateCreateTask(req, res, next) {
  try {
    req.body = validateTaskPayload(req.body);
    return next();
  } catch (error) {
    return next(error);
  }
}

function validateUpdateTask(req, res, next) {
  try {
    req.body = validateTaskPayload(req.body, { partial: true });
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  validateCreateTask,
  validateTaskId,
  validateUpdateTask,
};
