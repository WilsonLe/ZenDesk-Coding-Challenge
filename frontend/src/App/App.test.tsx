import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import App from '.';
import { TicketData } from '../types';
import { getTickets } from './getTickets';

afterEach(cleanup);
const tickets: TicketData[] = [];
jest.mock('./getTickets', () => {
  return {
    getTickets: jest.fn().mockResolvedValue(tickets),
  };
});

describe('Testing App Component', () => {
  it('Displays "LOADING..." while fetching tickets', async () => {
    render(<App />);
    expect(screen.queryByText('LOADING...')).toBeInTheDocument();
    expect(getTickets).toHaveBeenCalledTimes(1);
    expect(getTickets).toHaveBeenCalledWith();
    await waitFor(() =>
      expect(screen.queryByText('LOADING...')).not.toBeInTheDocument()
    );
  });
});
