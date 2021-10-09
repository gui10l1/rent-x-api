import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import ListCarsService from './ListCarsService';

let fakeCarsRepository: FakeCarsRepository;
let listCarsService: ListCarsService;

describe('ListCars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listCarsService = new ListCarsService(fakeCarsRepository);
  });

  it('should be able to list cars', async () => {
    await fakeCarsRepository.create({
      brand: 'Brand',
      dailyValue: 1000.99,
      name: 'Car name',
    });

    await fakeCarsRepository.create({
      brand: 'Brand',
      dailyValue: 1000.99,
      name: 'Car name',
    });

    await fakeCarsRepository.create({
      brand: 'Brand',
      dailyValue: 1000.99,
      name: 'Car name',
    });

    await fakeCarsRepository.create({
      brand: 'Brand',
      dailyValue: 1000.99,
      name: 'Car name',
    });

    const cars = await listCarsService.execute();

    expect(cars.length).toBe(4);
  });
});
