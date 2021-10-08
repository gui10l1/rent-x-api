import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendRecoveryPasswordEmailService from '@modules/users/services/users/SendRecoveryPasswordEmailService';

export default class RecoveryMailPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = container.resolve(SendRecoveryPasswordEmailService);

    await service.execute(data);

    return res.send();
  }
}
