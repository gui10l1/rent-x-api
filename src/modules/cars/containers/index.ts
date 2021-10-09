import { container } from 'tsyringe';

import CarsRepository from '../infra/typeorm/repositories/CarsRepository';
import ICarsRepository from '../repositories/ICarsRepository';

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
