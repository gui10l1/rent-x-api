import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ISpecificationsRepository from '@modules/specifications/repositories/ISpecificationsRepository';

import AppError from '@shared/errors/AppError';

import ICarsSpecificationsRepositoryDTO from '../dtos/ICarsSpecificationsRepositoryDTO';
import CarSpecification from '../infra/typeorm/entities/CarSpecification';
import ICarsSpecificationsRepository from '../repositories/ICarsSpecificationsRepository';

@injectable()
export default class CreateCarsSpecificationsService {
  constructor(
    @inject('CarsSpecificationsRepository')
    private carsSpecificationsRepository: ICarsSpecificationsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  public async execute({
    carId,
    specificationId,
  }: ICarsSpecificationsRepositoryDTO): Promise<CarSpecification> {
    const findSpec = await this.specificationsRepository.findById(
      specificationId,
    );

    if (!findSpec) {
      throw new AppError('Especificação não encontrada!', 404);
    }

    const findCar = await this.carsRepository.findById(carId);

    if (!findCar) {
      throw new AppError('Veículo não encontrado!', 404);
    }

    const findDuplicated =
      await this.carsSpecificationsRepository.findDuplicated(
        carId,
        specificationId,
      );

    if (findDuplicated) {
      throw new AppError('Já existe um registro como este!');
    }

    return this.carsSpecificationsRepository.create({
      carId,
      specificationId,
    });
  }
}
