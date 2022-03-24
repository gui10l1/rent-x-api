import AppError from '@shared/errors/AppError';

import FakeSpecificationsRepository from '../repositories/fakes/FakeSpecificationsRepository';
import UpdateSpecificationsService from './UpdateSpecificationsService';

let fakeSpecificationsRepository: FakeSpecificationsRepository;
let updateSpecificationsService: UpdateSpecificationsService;

describe('UpdateSpecifications', () => {
  beforeEach(() => {
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    updateSpecificationsService = new UpdateSpecificationsService(
      fakeSpecificationsRepository,
    );
  });

  it('should not be able to update a non-existing specification', async () => {
    await expect(
      updateSpecificationsService.execute({
        specificationId: 'asjdhsadiuh',
        data: {
          description: 'Description',
          icon: 'Icon name',
          name: 'Specification',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update specifications names to duplicated ones', async () => {
    const specToBeUpdated = await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Specification',
    });

    await fakeSpecificationsRepository.create({
      description: 'Another description',
      icon: 'Icon name',
      name: 'Another specification',
    });

    await expect(
      updateSpecificationsService.execute({
        specificationId: specToBeUpdated.id,
        data: {
          name: 'Another specification',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a specification', async () => {
    const specToBeUpdated = await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Specification',
    });

    await fakeSpecificationsRepository.create({
      description: 'Another description',
      icon: 'Icon name',
      name: 'Another specification',
    });

    const updatedSpecification = await updateSpecificationsService.execute({
      specificationId: specToBeUpdated.id,
      data: {
        name: 'Updated specification',
      },
    });

    await updateSpecificationsService.execute({
      specificationId: specToBeUpdated.id,
      data: {
        description: 'Updated description',
      },
    });

    expect(updatedSpecification.id).toBe(specToBeUpdated.id);
    expect(updatedSpecification.name).toBe('Updated specification');
    expect(updatedSpecification.description).toBe('Updated description');
  });
});
