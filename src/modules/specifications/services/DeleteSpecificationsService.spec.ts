import AppError from '@shared/errors/AppError';

import FakeSpecificationsRepository from '../repositories/fakes/FakeSpecificationsRepository';
import DeleteSpecificationsService from './DeleteSpecificationsService';

let fakeSpecificationsRepository: FakeSpecificationsRepository;
let deleteSpecificationsService: DeleteSpecificationsService;

describe('DeleteSpecifications', () => {
  beforeEach(() => {
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    deleteSpecificationsService = new DeleteSpecificationsService(
      fakeSpecificationsRepository,
    );
  });

  it('should not be able to delete specifications which does not exist', async () => {
    await expect(
      deleteSpecificationsService.execute({
        specificationId: 'asljdhaksujid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete specifications', async () => {
    const spyOn = jest.spyOn(fakeSpecificationsRepository, 'delete');

    const spec = await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Specification',
    });

    await deleteSpecificationsService.execute({
      specificationId: spec.id,
    });

    expect(spyOn).toHaveBeenCalledWith(spec);
  });
});
