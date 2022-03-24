import { inject, injectable } from 'tsyringe';

import CarSpecification from '../infra/typeorm/entities/CarSpecification';
import ICarsSpecificationsRepository from '../repositories/ICarsSpecificationsRepository';

interface IRequest {
  relations?: string[];
}

@injectable()
export default class ListCarsSpecificationsService {
  constructor(
    @inject('CarsSpecificationsRepository')
    private carsSpecificationsRepository: ICarsSpecificationsRepository,
  ) {}

  public async execute(data?: IRequest): Promise<CarSpecification[]> {
    return this.carsSpecificationsRepository.list(data?.relations);
  }
}
