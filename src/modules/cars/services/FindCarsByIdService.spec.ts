import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import FindCarsByIdService from './FindCarsByIdService';

let fakeCarsRepository: FakeCarsRepository;
let findCarsByIdService: FindCarsByIdService;

describe('FindCarsById', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    findCarsByIdService = new FindCarsByIdService(fakeCarsRepository);
  });

  it('should not be able to find cars which does not exist', async () => {
    await expect(
      findCarsByIdService.execute({
        carId: 'asljdhaksujid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to find cars', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      dailyValue: 1000.99,
      name: 'Car name',
    });

    const findCar = await findCarsByIdService.execute({
      carId: car.id,
    });

    expect(findCar.id).toBe(car.id);
  });
});
