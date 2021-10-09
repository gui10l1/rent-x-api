import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarsService from '@modules/cars/services/CreateCarsService';
import DeleteCarsService from '@modules/cars/services/DeleteCarsService';
import FindCarsByIdService from '@modules/cars/services/FindCarsByIdService';
import ListCarsService from '@modules/cars/services/ListCarsService';
import UpdateCarsService from '@modules/cars/services/UpdateCarsService';

export default class CarsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListCarsService);

    const cars = await service.execute();

    const response = classToClass(cars);

    return res.json(response);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = container.resolve(CreateCarsService);

    const car = await service.execute(data);

    const response = classToClass(car);

    return res.json(response);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params;

    const service = container.resolve(FindCarsByIdService);

    const car = await service.execute({ carId });

    const response = classToClass(car);

    return res.json(response);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params;
    const data = req.body;

    const service = container.resolve(UpdateCarsService);

    const car = await service.execute({ carId, data });

    const response = classToClass(car);

    return res.json(response);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params;

    const service = container.resolve(DeleteCarsService);

    await service.execute({ carId });

    return res.send();
  }
}
