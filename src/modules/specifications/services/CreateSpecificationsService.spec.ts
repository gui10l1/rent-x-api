import AppError from '@shared/errors/AppError';

import FakeSpecificationsRepository from '../repositories/fakes/FakeSpecificationsRepository';
import CreateSpecificationsService from './CreateSpecificationsService';

let fakeSpecificationsRepository: FakeSpecificationsRepository;
let createSpecificationsService: CreateSpecificationsService;

describe('CreateSpecifications', () => {
  beforeEach(() => {
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createSpecificationsService = new CreateSpecificationsService(
      fakeSpecificationsRepository,
    );
  });

  it('should not be able to create specifications with duplicated names', async () => {
    await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Specification',
    });

    await expect(
      createSpecificationsService.execute({
        description: 'Description',
        icon: 'Icon name',
        name: 'Specification',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a specification', async () => {
    const specification = await createSpecificationsService.execute({
      description: 'Description',
      icon: 'Icon name',
      name: 'Specification',
    });

    expect(specification).toHaveProperty('id');
  });
});
