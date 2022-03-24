import { Router } from 'express';

import carsRoutes from '@modules/cars/infra/http/routes/cars.routes';
import specificationsRoutes from '@modules/specifications/infra/http/routes/specifications.routes';
import adminsRoutes from '@modules/users/infra/http/routes/admins.routes';
import resetUsersPasswordsRoutes from '@modules/users/infra/http/routes/resetUsersPasswords.routes';
import sendRecoveryPasswordsMailRoutes from '@modules/users/infra/http/routes/sendRecoveryPasswordsMail.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import usersPasswordRoutes from '@modules/users/infra/http/routes/usersPassword.routes';
import usersProfilePhotoRoutes from '@modules/users/infra/http/routes/usersProfilePhoto.routes';

const routes = Router();

routes.use(
  '/users',
  adminsRoutes,
  usersRoutes,
  usersPasswordRoutes,
  sessionsRoutes,
  usersProfilePhotoRoutes,
  sendRecoveryPasswordsMailRoutes,
  resetUsersPasswordsRoutes,
);
routes.use('/cars', carsRoutes);
routes.use('/specifications', specificationsRoutes);

export default routes;
