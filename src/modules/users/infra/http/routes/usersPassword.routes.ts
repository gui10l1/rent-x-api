import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

import UsersPasswordsController from '../controllers/UsersPasswordsController';

const usersPasswordRoutes = Router();
const usersPasswordsController = new UsersPasswordsController();

usersPasswordRoutes.patch(
  '/passwords',
  ensureAuthentication,
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      oldPassword: Joi.string().required(),
    },
  }),
  usersPasswordsController.update,
);

export default usersPasswordRoutes;
