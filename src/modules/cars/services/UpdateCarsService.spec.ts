import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import UpdateCarsService from './UpdateCarsService';

let fakeCarsRepository: FakeCarsRepository;
let updateCarsService: UpdateCarsService;

describe('UpdateCars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    updateCarsService = new UpdateCarsService(fakeCarsRepository);
  });

  it('should not be able to update cars that does not exist', async () => {
    await expect(
      updateCarsService.execute({
        carId: 'asjlhaskjhdk',
        data: {
          brand: 'Brand',
          dailyValue: 999.55,
          name: 'Car name',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update cars with daily value more expensive than 9999.99', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      dailyValue: 5000,
      name: 'Car name',
    });

    await expect(
      updateCarsService.execute({
        carId: car.id,
        data: {
          brand: 'Brand',
          dailyValue: 10000,
          name: 'Car name',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update cars', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      dailyValue: 5000,
      name: 'Car name',
    });

    const carUpdated = await updateCarsService.execute({
      carId: car.id,
      data: {
        brand: 'Brand',
        dailyValue: 1000.99,
        name: 'Car name',
      },
    });

    expect(car.id).toBe(carUpdated.id);
  });
});
