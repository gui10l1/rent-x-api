import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionsService from '@modules/users/services/sessions/CreateSessionsService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = container.resolve(CreateSessionsService);

    const { user, token } = await service.execute(data);

    const parsedUser = classToClass(user);

    return res.json({ token, user: parsedUser });
  }
}
