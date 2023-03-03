import { logger } from '../services/logger.js';
import { HttpCode } from '../constants.js';

const errorResponse = (schemaErrors) => {
  const errors = schemaErrors.map((error) => {
    let { path, message } = error;
    return { path, message };
  });
  return {
    status: 'failed',
    errors,
  };
};

export const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error?.isJoi) {
      res.status(HttpCode.BAD_REQUEST).json(errorResponse(error.details));
      logger.error(
        `Request: ${req.method} '${req.url}'. Message: ${error.message}`
      );
    } else {
      next();
    }
  };
};
