import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/uploadConfig';

import AdminsController from '../controllers/AdminsController';

const adminsRoutes = Router();
const adminsController = new AdminsController();
const upload = multer(uploadConfig.config.multer);

adminsRoutes.post(
  '/admins',
  upload.single('profileImage'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      admin: Joi.bool().required(),
    },
  }),
  adminsController.create,
);

export default adminsRoutes;
