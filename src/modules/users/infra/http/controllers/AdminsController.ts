import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAdminsService from '@modules/users/services/CreateAdminsService';

import AppError from '@shared/errors/AppError';

export default class AdminsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const file = req.file as Express.Multer.File;

    if (!file) {
      throw new AppError('Insira um arquivo para sua foto de perfil!');
    }

    const service = container.resolve(CreateAdminsService);

    const user = await service.execute({
      ...data,
      profileImage: file.filename,
    });

    const response = classToClass(user);

    return res.json(response);
  }
}
