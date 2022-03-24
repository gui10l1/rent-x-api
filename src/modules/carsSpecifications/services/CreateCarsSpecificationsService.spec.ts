import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCarsRepository';
import FakeSpecificationsRepository from '@modules/specifications/repositories/fakes/FakeSpecificationsRepository';

import AppError from '@shared/errors/AppError';

import FakeCarsSpecificationsRepository from '../repositories/fakes/FakeCarsSpecificationsRepository';
import CreateCarsSpecificationsService from './CreateCarsSpecificationsService';

let fakeCarsSpecificationsRepository: FakeCarsSpecificationsRepository;
let fakeCarsRepository: FakeCarsRepository;
let fakeSpecificationsRepository: FakeSpecificationsRepository;
let createCarsSpecificationsRepositoryService: CreateCarsSpecificationsService;

describe('CreateCarsSpecifications', () => {
  beforeEach(() => {
    fakeCarsSpecificationsRepository = new FakeCarsSpecificationsRepository();
    fakeCarsRepository = new FakeCarsRepository();
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createCarsSpecificationsRepositoryService =
      new CreateCarsSpecificationsService(
        fakeCarsSpecificationsRepository,
        fakeCarsRepository,
        fakeSpecificationsRepository,
      );
  });

  it('should not be able to create cars specifications to cars that does not exist', async () => {
    const spec = await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Specification name',
    });

    await expect(
      createCarsSpecificationsRepositoryService.execute({
        carId: 'asljdhaksujid',
        specificationId: spec.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create cars specifications with specifications that does not exist', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand name',
      dailyValue: 500.89,
      name: 'Car name',
    });

    await expect(
      createCarsSpecificationsRepositoryService.execute({
        specificationId: 'asljdhaksujid',
        carId: car.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to duplicate instances', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand name',
      dailyValue: 500.89,
      name: 'Car name',
    });

    const spec = await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Specification name',
    });

    await createCarsSpecificationsRepositoryService.execute({
      specificationId: spec.id,
      carId: car.id,
    });

    await expect(
      createCarsSpecificationsRepositoryService.execute({
        specificationId: spec.id,
        carId: car.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create cars specifications', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand name',
      dailyValue: 500.89,
      name: 'Car name',
    });

    const spec = await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Specification name',
    });

    const carSpec = await createCarsSpecificationsRepositoryService.execute({
      specificationId: spec.id,
      carId: car.id,
    });

    expect(carSpec).toHaveProperty('id');
  });
});
