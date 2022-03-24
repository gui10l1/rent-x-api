import AppError from '@shared/errors/AppError';

import FakeCarsSpecificationsRepository from '../repositories/fakes/FakeCarsSpecificationsRepository';
import DeleteCarsSpecificationsService from './DeleteCarsSpecificationsService';

let fakeCarsSpecificationsRepository: FakeCarsSpecificationsRepository;
let deleteCarsSpecificationsService: DeleteCarsSpecificationsService;

describe('DeleteCarsSpecifications', () => {
  beforeEach(() => {
    fakeCarsSpecificationsRepository = new FakeCarsSpecificationsRepository();
    deleteCarsSpecificationsService = new DeleteCarsSpecificationsService(
      fakeCarsSpecificationsRepository,
    );
  });

  it('should not be able to delete cars specifications which does not exist', async () => {
    await expect(
      deleteCarsSpecificationsService.execute({
        carSpecId: 'asljdhaksujid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete cars specifications', async () => {
    const spyOn = jest.spyOn(fakeCarsSpecificationsRepository, 'delete');

    const carSpec = await fakeCarsSpecificationsRepository.create({
      carId: 'carId',
      specificationId: 'specificationId',
    });

    await deleteCarsSpecificationsService.execute({
      carSpecId: carSpec.id,
    });

    expect(spyOn).toHaveBeenCalledWith(carSpec);
  });
});
