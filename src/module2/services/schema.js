import Joi from 'joi';

export const userSchema = Joi.object().keys({
  id: Joi.number(),
  login: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi.boolean().required(),
});

export const groupSchema = Joi.object().keys({
  id: Joi.string(),
  name: Joi.string().required(),
  permissions: Joi.array()
    .items('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
    .required(),
});
