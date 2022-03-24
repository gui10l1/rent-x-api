import { getRepository, Repository } from 'typeorm';

import ISpecificationsRepositoryDTO from '@modules/specifications/dtos/ISpecificationsRepositoryDTO';
import ISpecificationsRepository from '@modules/specifications/repositories/ISpecificationsRepository';

import Specification from '../entities/Specification';

export default class SpecificationsRepository
  implements ISpecificationsRepository
{
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  public async create(
    data: ISpecificationsRepositoryDTO,
  ): Promise<Specification> {
    const car = this.ormRepository.create({
      ...data,
    });

    await this.ormRepository.save(car);

    return car;
  }

  public async list(): Promise<Specification[]> {
    return this.ormRepository.find();
  }

  public async findById(
    specificationId: string,
  ): Promise<Specification | undefined> {
    return this.ormRepository.findOne({
      where: { id: specificationId },
    });
  }

  public async update(
    specificationToBeUpdated: Specification,
    data: Partial<ISpecificationsRepositoryDTO>,
  ): Promise<Specification> {
    const specificationUpdated = this.ormRepository.merge(
      specificationToBeUpdated,
      {
        ...data,
      },
    );

    await this.ormRepository.save(specificationUpdated);

    return specificationToBeUpdated;
  }

  public async delete(specificationToBeDeleted: Specification): Promise<void> {
    await this.ormRepository.remove(specificationToBeDeleted);
  }

  public async findByName(
    specificationName: string,
  ): Promise<Specification | undefined> {
    return this.ormRepository.findOne({
      where: { name: specificationName },
    });
  }
}
