import { Router } from 'express';

import adminsRoutes from '@modules/users/infra/http/routes/admins.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', adminsRoutes, usersRoutes);

export default routes;
