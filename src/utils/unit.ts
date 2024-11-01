import { Unit } from '@/features/unit/types/Unit';

export const UnitPriceConversor = (unit: Unit, targetUnit: Unit, quantity: number, price: number) => {
  switch (unit.acronym) {
    case 'un.':
      return price / quantity;
    case 'mg':
      if (targetUnit.acronym === 'g') {
        return (price / quantity) * 1000;
      }
      if (targetUnit.acronym === 'kg') {
        return (price / quantity) * 1000000;
      }
      break;
    case 'g':
      if (targetUnit.acronym === 'kg') {
        return (price / quantity) * 1000;
      }
      if (targetUnit.acronym === 'mg') {
        return price / quantity / 1000;
      }
      break;
    case 'kg':
      if (targetUnit.acronym === 'g') {
        return price / quantity / 1000;
      }
      if (targetUnit.acronym === 'mg') {
        return price / quantity / 1000000;
      }
      break;
  }

  return price / quantity;
};
