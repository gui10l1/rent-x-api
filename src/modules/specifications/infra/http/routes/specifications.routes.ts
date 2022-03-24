import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAdminAccess from '@shared/infra/http/middlewares/ensureAdminAccess';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

import SpecificationsController from '../controllers/SpecificationsController';

const specificationsRoutes = Router();
const specificationsController = new SpecificationsController();

specificationsRoutes.get(
  '/',
  ensureAuthentication,
  specificationsController.index,
);

specificationsRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdminAccess,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      icon: Joi.number().required(),
    },
  }),
  specificationsController.create,
);

specificationsRoutes.put(
  '/:specificationId',
  ensureAuthentication,
  ensureAdminAccess,
  celebrate({
    [Segments.PARAMS]: {
      specificationId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
      icon: Joi.number(),
    },
  }),
  specificationsController.update,
);

specificationsRoutes.delete(
  '/:specificationId',
  ensureAuthentication,
  ensureAdminAccess,
  celebrate({
    [Segments.PARAMS]: { specificationId: Joi.string().uuid().required() },
  }),
  specificationsController.delete,
);

export default specificationsRoutes;
