import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISpecificationsRepository from '../repositories/ISpecificationsRepository';

interface IRequest {
  specificationId: string;
}

@injectable()
export default class DeleteSpecificationsService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  public async execute({ specificationId }: IRequest): Promise<void> {
    const findSpec = await this.specificationsRepository.findById(
      specificationId,
    );

    if (!findSpec) {
      throw new AppError(
        'Não foi possível encontrar essa escificação para deletar',
        404,
      );
    }

    return this.specificationsRepository.delete(findSpec);
  }
}
