import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/uploadConfig';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

import UsersProfilePhotoController from '../controllers/UsersProfilePhotoController';

const usersProfilePhotoRoutes = Router();
const usersProfileImageController = new UsersProfilePhotoController();
const upload = multer(uploadConfig.config.multer);

usersProfilePhotoRoutes.patch(
  '/profile-photo',
  ensureAuthentication,
  upload.single('profileImage'),
  usersProfileImageController.update,
);

export default usersProfilePhotoRoutes;
