import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CallWindow from './CallWindow';

describe('CallWindow Component', () => {


  test('calls onCall with duration when "Созвониться" button is clicked', () => {
    const mockCall = {
      from: { name: 'Иван', phone: '+1234567890', city: 'Москва' },
      to: { name: 'Мария', phone: '+9876543210', city: 'Санкт-Петербург' },
      duration: 10,
    };
    const onCallMock = jest.fn();

    render(<CallWindow call={mockCall} onCall={onCallMock} />);

    const callButton = screen.getByText(/созвониться/i);
    fireEvent.click(callButton);

    expect(onCallMock).toHaveBeenCalledWith(10);
  });

  test('calls onNext when "Следующий разговор" button is clicked', () => {
    const onNextMock = jest.fn();

    render(<CallWindow call={{ from: {}, to: {} }} onNext={onNextMock} />);
  
    const nextButton = screen.getByText(/следующий разговор/i);
    fireEvent.click(nextButton);
  
    expect(onNextMock).toHaveBeenCalledTimes(1);
  });
});
