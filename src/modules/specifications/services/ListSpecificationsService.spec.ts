import FakeSpecificationsRepository from '../repositories/fakes/FakeSpecificationsRepository';
import ListSpecificationsService from './ListSpecificationsService';

let fakeSpecificationsRepository: FakeSpecificationsRepository;
let listSpecificationsService: ListSpecificationsService;

describe('ListSpecifications', () => {
  beforeEach(() => {
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    listSpecificationsService = new ListSpecificationsService(
      fakeSpecificationsRepository,
    );
  });

  it('should be able to create a specification', async () => {
    await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Name',
    });

    await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Name',
    });

    await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Name',
    });

    await fakeSpecificationsRepository.create({
      description: 'Description',
      icon: 'Icon name',
      name: 'Name',
    });

    const specifications = await listSpecificationsService.execute();

    expect(specifications.length).toBe(4);
  });
});
