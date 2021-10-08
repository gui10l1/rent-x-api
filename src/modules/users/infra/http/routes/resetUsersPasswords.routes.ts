import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ResetUsersPasswordsController from '../controllers/ResetUsersPasswordsController';

const resetUsersPasswordsRoutes = Router();
const resetUsersPasswordsController = new ResetUsersPasswordsController();

resetUsersPasswordsRoutes.patch(
  '/passwords/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    },
  }),
  resetUsersPasswordsController.update,
);

export default resetUsersPasswordsRoutes;
