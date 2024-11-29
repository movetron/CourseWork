import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Report from './Report';
test('should display a message when call history is empty', () => {
  render(<Report history={[]} maxCost={0} onDeleteCall={() => {}} onDeleteByLastName={() => {}} />);
  const emptyMessage = screen.getByText(/история звонков пуста/i);
  expect(emptyMessage).toBeInTheDocument();
});

test('should display the maximum call cost', () => {
  render(
    <Report
      history={[
        { id: 1, from: { name: 'Алексей', city: 'Москва' }, to: { name: 'Иван' }, cost: 100 },
      ]}
      maxCost={100}
      onDeleteCall={() => {}}
      onDeleteByLastName={() => {}}
    />
  );
  const maxCostElement = screen.getByText(/максимальная стоимость звонка: 100 руб/i);
  expect(maxCostElement).toBeInTheDocument();
});

test('should correctly display call distribution by city', () => {
  render(
    <Report
      history={[
        { id: 1, from: { name: 'Алексей', city: 'Москва' }, to: { name: 'Иван' }, cost: 100 },
        { id: 2, from: { name: 'Ирина', city: 'Москва' }, to: { name: 'Екатерина' }, cost: 200 },
      ]}
      maxCost={200}
      onDeleteCall={() => {}}
      onDeleteByLastName={() => {}}
    />
  );
  const cityDistributionElement = screen.getByText(/москва: 2 звонков/i);
  expect(cityDistributionElement).toBeInTheDocument();
});