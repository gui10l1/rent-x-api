import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUsersProfilePhotoService from '@modules/users/services/users/UpdateUsersProfilePhotoService';

export default class UsersProfilePhotoController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const file = req.file as Express.Multer.File;

    const profileImage = file.filename;

    const service = container.resolve(UpdateUsersProfilePhotoService);

    const user = await service.execute({ userId, profileImage });

    const response = classToClass(user);

    return res.json(response);
  }
}
