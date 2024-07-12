import * as Joi from 'joi';
export const EnvConfiguration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT: Number(process.env.PORT),
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRATION: Number(process.env.ACCESS_TOKEN_EXPIRATION),
  REFRESH_TOKEN_EXPIRATION: Number(process.env.REFRESH_TOKEN_EXPIRATION),
  COOKIE_ACCESS_TOKEN_EXPIRATION: Number(
    process.env.COOKIE_ACCESS_TOKEN_EXPIRATION,
  ),
  COOKIE_REFRESH_TOKEN_EXPIRATION: Number(
    process.env.COOKIE_REFRESH_TOKEN_EXPIRATION,
  ),
});

export const EnvValidationSchema = Joi.object({
  NODE_ENV: Joi.string().default('dev'),
  PORT: Joi.number()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  DB_HOST: Joi.string()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  DB_NAME: Joi.string()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  DB_PORT: Joi.number()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  DB_USERNAME: Joi.string()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  DB_PASSWORD: Joi.string()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  ACCESS_TOKEN_SECRET_KEY: Joi.string()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  REFRESH_TOKEN_SECRET_KEY: Joi.string()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  ACCESS_TOKEN_EXPIRATION: Joi.number()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  REFRESH_TOKEN_EXPIRATION: Joi.number()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  COOKIE_ACCESS_TOKEN_EXPIRATION: Joi.number()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
  COOKIE_REFRESH_TOKEN_EXPIRATION: Joi.number()
    .required()
    .messages({ 'any.required': 'Please provide environment variable {#key}' }),
});
