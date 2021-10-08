import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetUsersPasswordsService from '@modules/users/services/users/ResetUsersPasswordsService';

export default class ResetUsersPasswordsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = container.resolve(ResetUsersPasswordsService);

    await service.execute(data);

    return res.send();
  }
}
