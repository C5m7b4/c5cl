import Box from './Box';

type iData = {
  id: number;
  name: string;
  price: number;
  size: string;
  category: string;
};

export const data: iData[] = [
  { id: 1, name: 'apple', price: 0.99, size: 'each', category: 'fruit' },
  { id: 2, name: 'bananna', price: 1.1, size: 'each', category: 'fruit' },
  { id: 3, name: 'grapes', price: 1.99, size: 'bundle', category: 'fruit' },
  { id: 4, name: 'apple', price: 0.89, size: 'each', category: 'fruit' },
  {
    id: 5,
    name: 'Dr. Pepper',
    price: 1.09,
    size: '12 oz',
    category: 'beverages',
  },
  { id: 6, name: 'Mt. Dew', price: 4.99, size: '12 pk', category: 'beverages' },
  { id: 7, name: 'Coke', price: 1.79, size: '2 Liter', category: 'beverages' },
  { id: 8, name: 'Pepsi', price: 1.79, size: '2 Liter', category: 'beverages' },
  { id: 9, name: 'Tic Tacs', price: 2.99, size: '12 oz', category: 'candy' },
  { id: 10, name: 'Snickers', price: 1.59, size: 'bar', category: 'candy' },
  { id: 11, name: 'Almond Joy', price: 1.69, size: 'bar', category: 'candy' },
];

describe('Box', () => {
  test('should pass', () => {
    const getFoodBetweenOneAndTwo = (data: iData[]) =>
      Box(data)
        .map((x: iData[]) => x.filter((f) => f.category === 'beverages'))
        .map((x: iData[]) => x.filter((f) => f.price > 1.0))
        .map((x: iData[]) => x.filter((f) => f.price <= 2.0))
        .map((x: iData[]) => x.map((f) => f.price))
        .map((x: number[]) => x.map((f) => parseFloat(f.toString())))
        .map((x: number[]) => x.reduce((a, c) => a + c))
        .fold((x: any) => x);
    const result = getFoodBetweenOneAndTwo(data);
    console.log(result);
    expect(result).toEqual(4.67);
  });
});
