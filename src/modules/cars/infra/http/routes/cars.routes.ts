import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAdminAccess from '@shared/infra/http/middlewares/ensureAdminAccess';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

import CarsController from '../controllers/CarsController';

const carsRoutes = Router();
const carsController = new CarsController();

carsRoutes.get('/', ensureAuthentication, carsController.index);
carsRoutes.get(
  '/:carId',
  ensureAuthentication,
  celebrate({ [Segments.PARAMS]: { carId: Joi.string().uuid().required() } }),
  carsController.find,
);

carsRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdminAccess,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      brand: Joi.string().required(),
      dailyValue: Joi.number().required(),
    },
  }),
  carsController.create,
);

carsRoutes.put(
  '/:carId',
  ensureAuthentication,
  ensureAdminAccess,
  celebrate({
    [Segments.PARAMS]: {
      carId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      brand: Joi.string(),
      dailyValue: Joi.number(),
    },
  }),
  carsController.update,
);

carsRoutes.delete(
  '/:carId',
  ensureAuthentication,
  ensureAdminAccess,
  celebrate({ [Segments.PARAMS]: { carId: Joi.string().uuid().required() } }),
  carsController.delete,
);

export default carsRoutes;
