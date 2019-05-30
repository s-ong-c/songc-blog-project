// @flow
import Sequelize from 'sequelize';
import Joi from 'joi';

export const primaryUUID = {
  type: Sequelize.UUID,
  defaultValue: Sequelize.UUIDV1,
  primaryKey: true,
};

// validatae schema -> 리턴 400,  만약  not valid
export const validateSchema = (ctx: any, schema: any): any => {
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = {
      name: 'WRONG_SCHEMA',
      payload: result.error,
    };
    return false;
  }
  return true;
};

export const filterUnique = (array: Array<string>): Array<string> => {
  return [...new Set(array)];
};
