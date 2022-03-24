import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSpecificationsService from '@modules/specifications/services/CreateSpecificationsService';
import DeleteSpecificationsService from '@modules/specifications/services/DeleteSpecificationsService';
import ListSpecificationsService from '@modules/specifications/services/ListSpecificationsService';
import UpdateSpecificationsService from '@modules/specifications/services/UpdateSpecificationsService';

export default class SpecificationsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListSpecificationsService);

    const specifications = await service.execute();

    const response = classToClass(specifications);

    return res.json(response);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = container.resolve(CreateSpecificationsService);

    const specification = await service.execute(data);

    const response = classToClass(specification);

    return res.json(response);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { specificationId } = req.params;
    const data = req.body;

    const service = container.resolve(UpdateSpecificationsService);

    const specification = await service.execute({ specificationId, data });

    const response = classToClass(specification);

    return res.json(response);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { specificationId } = req.params;

    const service = container.resolve(DeleteSpecificationsService);

    await service.execute({ specificationId });

    return res.send();
  }
}
