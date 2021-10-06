import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/uploadConfig';

import UsersController from '../controllers/UsersController';

const usersRoutes = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig.config.multer);

usersRoutes.post(
  '/',
  upload.single('profileImage'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRoutes;
