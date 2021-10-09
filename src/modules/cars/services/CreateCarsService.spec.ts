import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarsService from './CreateCarsService';

let fakeCarsRepository: FakeCarsRepository;
let createCarsService: CreateCarsService;

describe('CreateCars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    createCarsService = new CreateCarsService(fakeCarsRepository);
  });

  it('should not be able to create cars with daily value more expensive than 9999.99', async () => {
    await expect(
      createCarsService.execute({
        brand: 'Brand',
        dailyValue: 100000.0,
        name: 'Car name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create cars', async () => {
    const car = await createCarsService.execute({
      brand: 'Brand',
      dailyValue: 1000.99,
      name: 'Car name',
    });

    expect(car).toHaveProperty('id');
  });
});
