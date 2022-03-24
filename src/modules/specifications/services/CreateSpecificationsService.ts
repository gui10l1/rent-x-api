import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISpecificationsRepositoryDTO from '../dtos/ISpecificationsRepositoryDTO';
import Specification from '../infra/typeorm/entities/Specification';
import ISpecificationsRepository from '../repositories/ISpecificationsRepository';

@injectable()
export default class CreateSpecificationsService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  public async execute(
    data: ISpecificationsRepositoryDTO,
  ): Promise<Specification> {
    const findSpecByName = await this.specificationsRepository.findByName(
      data.name,
    );

    if (findSpecByName) {
      throw new AppError('Já existe uma specifição com esse nome');
    }

    return this.specificationsRepository.create(data);
  }
}
