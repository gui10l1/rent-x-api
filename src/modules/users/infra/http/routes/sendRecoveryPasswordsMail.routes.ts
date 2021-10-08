import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import RecoveryMailPasswordController from '../controllers/RecoveryMailPasswordController';

const sendRecoveryPasswordsMailRoutes = Router();
const recoveryMailPasswordController = new RecoveryMailPasswordController();

sendRecoveryPasswordsMailRoutes.post(
  '/passwords/send-recovery-email',
  celebrate({ [Segments.BODY]: { email: Joi.string().email().required() } }),
  recoveryMailPasswordController.create,
);

export default sendRecoveryPasswordsMailRoutes;
