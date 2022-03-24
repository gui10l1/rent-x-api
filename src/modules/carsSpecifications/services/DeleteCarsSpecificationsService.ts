import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICarsSpecificationsRepository from '../repositories/ICarsSpecificationsRepository';

interface IRequest {
  carSpecId: string;
}

@injectable()
export default class DeleteCarsSpecificationsService {
  constructor(
    @inject('CarsSpecificationsRepository')
    private carsSpecificationsRepositoty: ICarsSpecificationsRepository,
  ) {}

  public async execute({ carSpecId }: IRequest): Promise<void> {
    const findCarSpec = await this.carsSpecificationsRepositoty.findById(
      carSpecId,
    );

    if (!findCarSpec) {
      throw new AppError('Instância não encontrada!', 404);
    }

    await this.carsSpecificationsRepositoty.delete(findCarSpec);
  }
}
