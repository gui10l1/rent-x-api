import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISpecificationsRepositoryDTO from '../dtos/ISpecificationsRepositoryDTO';
import Specification from '../infra/typeorm/entities/Specification';
import ISpecificationsRepository from '../repositories/ISpecificationsRepository';

interface IRequest {
  specificationId: string;
  data: Partial<ISpecificationsRepositoryDTO>;
}

@injectable()
export default class UpdateSpecificationsService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  public async execute({
    specificationId,
    data,
  }: IRequest): Promise<Specification> {
    const findSpec = await this.specificationsRepository.findById(
      specificationId,
    );

    if (!findSpec) {
      throw new AppError('A specificação selecionada não existe', 404);
    }

    if (data.name) {
      const findSpecByName = await this.specificationsRepository.findByName(
        data.name,
      );

      if (findSpecByName) {
        throw new AppError('Já existe uma specifiação com esse nome');
      }
    }

    return this.specificationsRepository.update(findSpec, data);
  }
}
