import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUsersPasswordService from '@modules/users/services/users/UpdateUsersPasswordService';

export default class UsersPasswordsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const { id: userId } = req.user;

    const service = container.resolve(UpdateUsersPasswordService);

    const user = await service.execute({ userId, ...data });

    const response = classToClass(user);

    return res.json(response);
  }
}
