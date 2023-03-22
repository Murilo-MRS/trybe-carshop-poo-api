import CategoryTypes from '../utils/CategoryTypes';

interface IMotorcycle {
  id?: string;
  model: string;
  year: number;
  color: string;
  status: boolean;
  buyValue: number;
  category: CategoryTypes;
  engineCapacity: number;
}

export default IMotorcycle;