import { inject, injectable } from 'tsyringe';

import Specification from '../infra/typeorm/entities/Specification';
import ISpecificationsRepository from '../repositories/ISpecificationsRepository';

@injectable()
export default class ListSpecificationsService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  public async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list();
  }
}
