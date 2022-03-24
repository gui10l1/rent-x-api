import FakeCarsSpecificationsRepository from '../repositories/fakes/FakeCarsSpecificationsRepository';
import ListCarsSpecificationsService from './ListCarsSpecificationsService';

let fakeCarsSpecificationsRepository: FakeCarsSpecificationsRepository;
let listCarsSpecificationsService: ListCarsSpecificationsService;

describe('ListCarsSpecifications', () => {
  beforeEach(() => {
    fakeCarsSpecificationsRepository = new FakeCarsSpecificationsRepository();
    listCarsSpecificationsService = new ListCarsSpecificationsService(
      fakeCarsSpecificationsRepository,
    );
  });

  it('should be able to create a specification', async () => {
    await fakeCarsSpecificationsRepository.create({
      carId: 'carId',
      specificationId: 'specificationId',
    });

    await fakeCarsSpecificationsRepository.create({
      carId: 'carId',
      specificationId: 'specificationId',
    });

    await fakeCarsSpecificationsRepository.create({
      carId: 'carId',
      specificationId: 'specificationId',
    });

    await fakeCarsSpecificationsRepository.create({
      carId: 'carId',
      specificationId: 'specificationId',
    });

    const specifications = await listCarsSpecificationsService.execute();

    expect(specifications.length).toBe(4);
  });
});
