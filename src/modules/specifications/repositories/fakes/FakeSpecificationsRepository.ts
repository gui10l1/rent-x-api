import { v4 } from 'uuid';

import ISpecificationsRepositoryDTO from '@modules/specifications/dtos/ISpecificationsRepositoryDTO';
import Specification from '@modules/specifications/infra/typeorm/entities/Specification';

import ISpecificationsRepository from '../ISpecificationsRepository';

export default class FakeSpecificationsRepository
  implements ISpecificationsRepository
{
  private specifications: Specification[] = [];

  public async create(
    data: ISpecificationsRepositoryDTO,
  ): Promise<Specification> {
    const spec = new Specification();

    Object.assign(spec, {
      id: v4(),
      ...data,
    });

    this.specifications.push(spec);

    return spec;
  }

  public async findById(
    specificationId: string,
  ): Promise<Specification | undefined> {
    return this.specifications.find(spec => spec.id === specificationId);
  }

  public async update(
    specification: Specification,
    data: Partial<ISpecificationsRepositoryDTO>,
  ): Promise<Specification> {
    const findSpecIndex = this.specifications.findIndex(
      spec => spec.id === specification.id,
    );

    Object.assign(specification, {
      ...data,
    });

    this.specifications[findSpecIndex] = specification;

    return specification;
  }

  public async delete(specification: Specification): Promise<void> {
    const findSpecIndex = this.specifications.findIndex(
      spec => spec.id === specification.id,
    );

    this.specifications.splice(findSpecIndex, 1);
  }

  public async list(): Promise<Specification[]> {
    return this.specifications;
  }

  public async findByName(
    specificationName: string,
  ): Promise<Specification | undefined> {
    return this.specifications.find(spec => spec.name === specificationName);
  }
}
