import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import DeleteCarsService from './DeleteCarsService';

let fakeCarsRepository: FakeCarsRepository;
let deleteCarsService: DeleteCarsService;

describe('DeleteCars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    deleteCarsService = new DeleteCarsService(fakeCarsRepository);
  });

  it('should not be able to delete cars which does not exist', async () => {
    await expect(
      deleteCarsService.execute({
        carId: 'asljdhaksujid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to find cars', async () => {
    const spyOn = jest.spyOn(fakeCarsRepository, 'delete');

    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      dailyValue: 1000.99,
      name: 'Car name',
    });

    await deleteCarsService.execute({
      carId: car.id,
    });

    expect(spyOn).toHaveBeenCalled();
  });
});
